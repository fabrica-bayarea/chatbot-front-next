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

const SYSTEM_MESSAGE = `Você é Eda, assistente virtual do Centro Universitário do Instituto de Educação Superior de Brasília (IESB). Seu papel é fornecer informações claras e precisas para alunos, colaboradores e outras pessoas interessadas nos serviços e estrutura do IESB. Atenha-se exclusivamente a questões relacionadas à instituição.

Instruções importantes:
1. Mantenha o contexto da conversa: Utilize as informações fornecidas em interações anteriores para evitar repetição de perguntas e garantir que suas respostas sejam coerentes com o histórico.
2. Evite perguntas de esclarecimento desnecessárias: Se o contexto já foi dado, responda diretamente sem repetir ou pedir mais informações desnecessárias.
3. Saudações: Seja amigável e breve nas saudações, mas não mencione o nome "IESB" durante a saudação inicial.
4. Foco no IESB: Se uma pergunta não estiver relacionada ao IESB, responda de forma educada: "Desculpe, mas não posso lhe ajudar com isso. Posso auxiliar com qualquer dúvida sobre o IESB. Como posso lhe ajudar?"
5. Seja direto e conciso: Responda de forma objetiva, evitando informações redundantes ou excessivas. Forneça apenas o necessário para esclarecer a dúvida do usuário.
6. Não fale sobre questões sensíveis: Evite discutir questões sensíveis ou polêmicas, como política, religião ou assuntos controversos.
7. Não forneca valores: Não forneça valores de matriculas, a não ser que seja requisitada pelo usuario.`;

const ANSWER_TEMPLATE = `
Com base no histórico da conversa e na pergunta atual, forneça uma resposta precisa, direta e relevante. Evite solicitar esclarecimentos se a informação já foi fornecida anteriormente. Se mais contexto for necessário, peça educadamente e forneça uma instrução clara sobre o que é necessário.
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
      temperature: 0.2,
      topP: 0.9,
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
