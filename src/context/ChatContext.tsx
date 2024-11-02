'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { type Updater } from 'use-immer';
import { v4 as uuidv4 } from 'uuid';

import { createAIMessage, createHumanMessage } from '@/actions/messages';
import { useConversation, useMainContext } from '@/hooks';
import api from '@/utils/data';
import statusCodes from '@/utils/statusCodes';

import type {
  ChatContextShared,
  Conversation,
  FetchStreamPayload,
  MakeRequestParams,
  Message,
} from '@/utils/definitions';

const ChatContext = createContext<ChatContextShared | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { makeRequest, user } = useMainContext();

  const newConversation: Conversation = {
    id: uuidv4(),
    owner_id: user?.id,
    created_at: new Date().toISOString(),
    status: 'open',
    active_support: null,
    messages: [],
    owner_profile: user,
    support_details: null,
  };

  const { conversation, setConversation } = useConversation(() => newConversation) as {
    conversation: Conversation;
    setConversation: Updater<Conversation>;
  };

  const [isStreaming, setIsStreaming] = useState<boolean | undefined>(undefined);

  const getStream = async (content: string) => {
    const messages = conversation.messages.concat({
      id: uuidv4(),
      conversation_id: conversation.id,
      content,
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

  const sendMessage = async (content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      conversation_id: conversation.id,
      content,
      created_at: new Date().toISOString(),
      role: 'user',
      owner_profile: user,
    };

    setConversation((draft) => {
      draft.messages.push(newMessage);
    });

    await createHumanMessage(newMessage);
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
    newConversation,
    conversation,
    setConversation,
    getStream,
    isStreaming,
    sendMessage,
  };

  return <ChatContext.Provider value={{ ...shared }}>{children}</ChatContext.Provider>;
}

export default ChatContext;
