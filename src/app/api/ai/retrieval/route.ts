// LangChain API Reference
// https://v02.api.js.langchain.com

import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { Document } from '@langchain/core/documents';
import { SystemMessage } from '@langchain/core/messages';
import { BytesOutputParser, StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { type Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export const runtime = 'edge';

const SYSTEM_MESSAGE =
  "Você é Eda, assistente virtual do Centro Universitário do Instituto de Educação Superior de Brasília (IESB). Seu papel é auxiliar alunos, colaboradores e outras pessoas com informações sobre nossa instituição. Atenha-se exclusivamente à sua função. Se a interação for sobre algo não relacionado ao IESB, responda: 'Desculpe, estou aqui para auxiliar com informações sobre o IESB. Nesse sentido, como posso lhe ajudar?'";

const ANSWER_TEMPLATE = `
  Responda à pergunta com base apenas no seguinte contexto e histórico de conversa:
  <contexto>
   {context}
  </contexto>
  
  <historico>
   {chat_history}
  </historico>
  
  Pergunta: {question}
`;

const combineDocuments = (docs: Document[]) => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join('\n\n');
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === 'user') {
      return `Humano: ${message.content}`;
    } else if (message.role === 'assistant') {
      return `Assistente: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });

  return formattedDialogueTurns.join('\n');
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const systemMessage = new SystemMessage({ content: SYSTEM_MESSAGE });
    const messages = [systemMessage, ...(body.messages ?? [])];
    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;

    const client = createClient();

    const vectorstore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client,
      tableName: 'documents',
      queryName: 'match_documents',
    });

    let resolveWithDocuments: (value: Document[]) => void;

    const documentPromise = new Promise<Document[]>((resolve) => {
      resolveWithDocuments = resolve;
    });

    const retriever = vectorstore.asRetriever({
      callbacks: [
        {
          handleRetrieverEnd(documents) {
            resolveWithDocuments(documents);
          },
        },
      ],
    });

    const retrievalChain = retriever.pipe(combineDocuments);

    const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

    const model = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.4,
      topP: 0.9,
      frequencyPenalty: 0.3,
      presencePenalty: 0.3,
    });

    const answerChain = RunnableSequence.from([
      {
        context: RunnableSequence.from([(input) => input.question, retrievalChain]),
        chat_history: (input) => input.chat_history,
        question: (input) => input.question,
      },
      answerPrompt,
      model,
    ]);

    const conversationalRetrievalQAChain = RunnableSequence.from([
      {
        chat_history: (input) => input.chat_history,
        question: (input) => input.question,
      },
      answerChain,
      new BytesOutputParser(),
    ]);

    const stream = await conversationalRetrievalQAChain.stream({
      chat_history: formatVercelMessages(previousMessages),
      question: currentMessageContent,
    });

    const documents = await documentPromise;

    const serializedSources = Buffer.from(
      JSON.stringify(
        documents.map((doc) => {
          return {
            pageContent: doc.pageContent.slice(0, 50) + '...',
            metadata: doc.metadata,
          };
        })
      )
    ).toString('base64');

    return new StreamingTextResponse(stream, {
      headers: {
        'x-message-index': (previousMessages.length + 1).toString(),
        'x-sources': serializedSources,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
