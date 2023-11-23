'use client';

import { ReactNode, createContext, useCallback, useState } from 'react';

import { useMainContext } from '@/hooks';
import api from '@/lib/data';
import { statusCodes } from '@/utils';

import type {
  ChatContextType,
  ChatMessageType,
  ConversationType,
  UserType,
} from '@/types';

const ChatContext = createContext<undefined | ChatContextType>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { makeRequest, user } = useMainContext();
  const [conversationId, setConversationId] = useState('');
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [history, setHistory] = useState<ConversationType[]>([]);

  // Request functions
  const deleteConversation = useCallback(
    async (payload: { id: string }) => {
      const successFn = () => {
        setHistory(history.filter((conversation) => conversation.id !== payload.id));
      };

      const options = {
        apiRequest: api.deleteConversation,
        payload,
        successCode: statusCodes.OK,
        successFn,
      };

      return makeRequest<{ id: string }, {}>(options);
    },
    [history, makeRequest]
  );

  const getHistory = useCallback(async () => {
    const successFn = (data: ConversationType[]) => {
      const sortedData = data.sort((a, b) => {
        const timeA = a.messages[a.messages.length - 1].time;
        const timeB = b.messages[b.messages.length - 1].time;
        return timeB - timeA;
      });

      setHistory(sortedData);
    };

    const options = {
      apiRequest: api.fetchConversations,
      payload: { userId: (user as UserType).id },
      successCode: statusCodes.OK,
      successFn,
    };

    return makeRequest<{ userId: string }, ConversationType[]>(options);
  }, [makeRequest, user]);

  const getReply = useCallback(
    async (payload: { content: string }) => {
      const newMessages = messages.concat({
        role: 'user',
        content: payload.content,
        time: new Date().getTime(),
      });

      setMessages(newMessages);

      const body = {
        id: conversationId,
        messages: newMessages,
        userId: (user as UserType).id,
      };

      const successFn = (data: ConversationType) => {
        if (!conversationId) {
          setConversationId(data.id);
        }

        setMessages(data.messages);
      };

      const options = {
        apiRequest: api.fetchReply,
        payload: { body },
        successCode: statusCodes.OK,
        successFn,
      };

      return makeRequest<{ body: ConversationType }, ConversationType>(options);
    },
    [conversationId, makeRequest, messages, user]
  );

  // Update conversation id and messages
  const changeConversation = (id: string, messages: ChatMessageType[]) => {
    setConversationId(id);
    setMessages(messages);
  };

  const shared = {
    changeConversation,
    deleteConversation,
    getHistory,
    getReply,
    history,
    messages,
  };

  return <ChatContext.Provider value={{ ...shared }}>{children}</ChatContext.Provider>;
}

export default ChatContext;
