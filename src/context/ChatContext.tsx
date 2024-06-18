'use client';

import { useImmer } from 'use-immer';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMainContext } from '@/hooks';
import api from '@/utils/data';

import {
  ChatContextShared,
  Conversation,
  FetchStreamPayload,
  MakeRequestParams,
} from '@/utils/definitions';

import * as actions from '@/app/actions';
import statusCodes from '@/utils/statusCodes';

const ChatContext = createContext<ChatContextShared | undefined>(undefined);

export function ChatProvider(props: {
  children: ReactNode;
  conversation?: Conversation;
}) {
  const { makeRequest, user } = useMainContext();
  const [isStreaming, setIsStreaming] = useState<boolean | undefined>(undefined);

  const newConversation: Conversation = {
    id: '',
    ownerId: user?.id,
    created_at: new Date().toISOString(),
    status: 'open',
    messages: [],
  };

  const [conversation, setConversation] = useImmer<Conversation>(
    props.conversation ?? newConversation
  );

  const getAnswer = async (question: string) => {
    const messages = conversation.messages.concat({
      id: uuidv4(),
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

  const updateMessages = async () => {
    const { id } = await actions.updateAIConversation(
      conversation.id as string,
      conversation.messages.slice(-2)
    );

    if (!conversation.id) {
      setConversation((draft) => {
        draft.id = id;
      });
    }
  };

  useEffect(() => {
    if (isStreaming === false) {
      updateMessages();
    }
  }, [isStreaming]);

  const shared: ChatContextShared = {
    conversation,
    getAnswer,
    isStreaming,
    newConversation,
    setConversation,
  };

  return (
    <ChatContext.Provider value={{ ...shared }}>{props.children}</ChatContext.Provider>
  );
}

export default ChatContext;
