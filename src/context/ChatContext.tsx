'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { v4 as uuidv4 } from 'uuid';

import { createAIMessage, createHumanMessage } from '@/actions/messages';
import { useMainContext } from '@/hooks';
import api from '@/utils/data';
import statusCodes from '@/utils/statusCodes';

import type {
  ChatContextShared,
  Conversation,
  FetchStreamPayload,
  MakeRequestParams,
} from '@/utils/definitions';

const ChatContext = createContext<ChatContextShared | undefined>(undefined);

export function ChatProvider(props: {
  children: ReactNode;
  conversation?: Conversation;
}) {
  const { makeRequest, user } = useMainContext();

  const newConversation: Conversation = {
    id: uuidv4(),
    owner_id: user.id,
    created_at: new Date().toISOString(),
    status: 'open',
    messages: [],
  };

  const [conversation, setConversation] = useImmer<Conversation>(
    props.conversation ?? newConversation
  );
  
  const [isStreaming, setIsStreaming] = useState<boolean | undefined>(undefined);

  const getStream = async (question: string) => {
    const messages = conversation.messages.concat({
      id: uuidv4(),
      conversation_id: conversation.id,
      content: question,
      created_at: new Date().toISOString(),
      role: 'user',
      owner_profile: user,
    });

    setConversation((draft) => {
      draft.messages = messages;
    });

    const successFn = async (reader: ReadableStreamDefaultReader) => {
      try {
        setIsStreaming(true);
        setConversation((draft) => {
          draft.messages.push({
            id: uuidv4(),
            conversation_id: conversation.id,
            content: '',
            created_at: new Date().toISOString(),
            role: 'assistant',
            owner_profile: null,
          });
        });
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const decodedValue = new TextDecoder().decode(value);
          setConversation((draft) => {
            draft.messages[draft.messages.length - 1].content += decodedValue;
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        reader.releaseLock();
        setIsStreaming(false);
      }
    };

    const params: MakeRequestParams<FetchStreamPayload, ReadableStreamDefaultReader> = {
      apiRequest: api.fetchStream,
      payload: { body: { messages } },
      successCode: statusCodes.OK,
      successFn,
    };

    return makeRequest(params);
  };

  useEffect(() => {
    const updateMessages = async () => {
      await createAIMessage(conversation.messages.slice(-1)[0]);
      await createHumanMessage(conversation.messages.slice(-2)[0]);
    };

    if (isStreaming === false) {
      updateMessages();
    }
  }, [isStreaming]);

  const shared: ChatContextShared = {
    conversation,
    getStream,
    isStreaming,
    newConversation,
    setConversation,
  };

  return (
    <ChatContext.Provider value={{ ...shared }}>{props.children}</ChatContext.Provider>
  );
}

export default ChatContext;
