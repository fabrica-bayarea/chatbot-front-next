'use client';

import { ReactNode, createContext, useCallback, useState } from 'react';

import { useMainContext } from '@/hooks';
import api from '@/lib/data';
import { statusCodes } from '@/utils';

import type {
  ChatContextType,
  ChatMessageType,
  ConversationStatusType,
  ConversationType,
  FeedbackType,
  UserType,
} from '@/types';

const ChatContext = createContext<undefined | ChatContextType>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { makeRequest, user } = useMainContext();
  const [history, setHistory] = useState<ConversationType[]>([]);

  const initialConversation: ConversationType = {
    id: undefined,
    messages: [],
    status: 'open',
    userId: (user as UserType).id,
  };

  const [conversation, setConversation] = useState<ConversationType>(initialConversation);

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
      apiRequest: api.fetchConversationsByUser,
      payload: { userId: (user as UserType).id },
      successCode: statusCodes.OK,
      successFn,
    };

    return makeRequest<{ userId: string }, ConversationType[]>(options);
  }, [makeRequest, user]);

  const getReply = useCallback(
    async (payload: { content: string }) => {
      const prev = { ...conversation };

      const newMessages = prev.messages.concat({
        role: 'user',
        content: payload.content,
        time: Date.now(),
      });

      const newConversation = { ...prev, messages: newMessages };
      setConversation({ ...newConversation });

      const successFn = (data: ConversationType) => {
        setConversation({ ...data });
      };

      const errorFn = () => {
        setConversation({ ...prev });
      };

      const options = {
        apiRequest: api.fetchReply,
        payload: { body: newConversation },
        successCode: statusCodes.OK,
        successFn,
        errorFn,
      };

      return makeRequest<{ body: ConversationType }, ConversationType>(options);
    },
    [conversation, makeRequest]
  );

  const changeFeedback = useCallback(
    async (payload: { feedback: FeedbackType }) => {
      const newMessages = [...conversation.messages];
      newMessages[newMessages.length - 1].feedback = payload.feedback;
      const newConversation = { ...conversation, messages: newMessages };
      setConversation({ ...newConversation });
      const successFn = () => {};

      const options = {
        apiRequest: api.updateConversationMessages,
        payload: {
          body: { messages: conversation.messages },
          id: conversation.id as string,
        },
        successCode: statusCodes.OK,
        successFn,
      };

      return makeRequest<
        { body: { messages: ChatMessageType[] }; id: string },
        ConversationType
      >(options);
    },
    [conversation, makeRequest]
  );

  const changeConversationStatus = useCallback(
    async (payload: { status: ConversationStatusType }) => {
      const successFn = () => {
        setConversation((prev) => ({ ...prev, status: payload.status }));
      };

      const options = {
        apiRequest: api.updateConversationStatus,
        payload: {
          body: { status: payload.status },
          id: conversation.id as string,
        },
        successCode: statusCodes.OK,
        successFn,
      };

      return makeRequest<
        { body: { status: ConversationStatusType }; id: string },
        ConversationType
      >(options);
    },
    [conversation, makeRequest]
  );

  const shared = {
    changeFeedback,
    conversation,
    conversationLength: conversation.messages.length,
    deleteConversation,
    getHistory,
    getReply,
    initialConversation,
    history,
    setConversation,
    changeConversationStatus,
    isRedirected: conversation.status === 'redirected',
  };

  return <ChatContext.Provider value={{ ...shared }}>{children}</ChatContext.Provider>;
}

export default ChatContext;
