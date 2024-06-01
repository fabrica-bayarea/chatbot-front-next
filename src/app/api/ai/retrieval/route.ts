// LangChain API Reference
// https://v02.api.js.langchain.com/

import { NextRequest, NextResponse } from 'next/server';
import { Message as VercelChatMessage } from 'ai';

import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { Document } from '@langchain/core/documents';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { createClient } from '@supabase/supabase-js';

import { ANSWER_TEMPLATE, QUESTION_TEMPLATE } from '@/lib/promptTemplates';

export const runtime = 'edge';

const combineDocumentsFn = (docs: Document[]) => {
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
    const messages = body.messages ?? [];
    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;

    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PRIVATE_KEY!
    );

    const vectorstore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client,
      tableName: 'documents',
      queryName: 'match_documents',
    });

    const retriever = vectorstore.asRetriever();
    const retrievalChain = retriever.pipe(combineDocumentsFn);

    const questionPrompt = PromptTemplate.fromTemplate(QUESTION_TEMPLATE);
    const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

    const model = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.1,
    });

    const standaloneQuestionChain = RunnableSequence.from([
      questionPrompt,
      model,
      new StringOutputParser(),
    ]);

    const answerChain = RunnableSequence.from([
      {
        context: RunnableSequence.from([(input) => input.question, retrievalChain]),
        chat_history: (input) => input.chat_history,
        question: (input) => input.question,
      },
      answerPrompt,
      model,
      new StringOutputParser(),
    ]);

    const conversationalRetrievalQAChain = RunnableSequence.from([
      {
        chat_history: (input) => input.chat_history,
        question: standaloneQuestionChain,
      },
      answerChain,
    ]);

    const message = await conversationalRetrievalQAChain.invoke({
      chat_history: formatVercelMessages(previousMessages),
      question: currentMessageContent,
    });

    return NextResponse.json({ message }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
