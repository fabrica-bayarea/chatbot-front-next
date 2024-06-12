'use client';

import { useImmer } from 'use-immer';
import { createContext, useCallback, useEffect, useState } from 'react';

import { useMainContext } from '@/hooks';
import api from '@/lib/data';

import {
  ChatContextProps,
  ChatContextShared,
  Conversation,
  FetchAnswerPayload,
  MakeRequestParams,
} from '@/lib/definitions';

import * as actions from '@/app/actions';
import statusCodes from '@/lib/statusCodes';

const ChatContext = createContext<ChatContextShared | undefined>(undefined);

export function ChatProvider(props: ChatContextProps) {
  const { makeRequest, setAndShow, user } = useMainContext();
  const [isStreaming, setIsStreaming] = useState<boolean | undefined>(undefined);

  const initialConversation: Conversation = {
    messages: [],
    status: 'open',
    userId: user?.id as string,
  };

  const [conversation, setConversation] = useImmer<Conversation>(
    props.conversation ?? initialConversation
  );

  const getAnswer = async (question: string) => {
    const messages = conversation.messages.concat({
      role: 'user',
      content: question,
      time: Date.now(),
      user_profile: user,
    });

    setConversation((draft) => {
      draft.messages = messages;
    });

    const successFn = async (reader: ReadableStreamDefaultReader) => {
      try {
        setIsStreaming(true);
        setConversation((draft) => {
          draft.messages.push({
            role: 'assistant',
            content: '',
            time: Date.now(),
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

    const params: MakeRequestParams<FetchAnswerPayload, ReadableStreamDefaultReader> = {
      apiRequest: api.fetchAnswer,
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

    // setConversation((draft) => {
    //   draft.messages.splice(-2, 2, ...messages);
    // });

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
    conversationLength: conversation.messages.length,
    getAnswer,
    initialConversation,
    isStreaming,
    setConversation,
    supportLength: conversation.support?.messages.length ?? 0,
  };

  return (
    <ChatContext.Provider value={{ ...shared }}>{props.children}</ChatContext.Provider>
  );
}

export default ChatContext;
