'use client';

import { createContext, useCallback, useState } from 'react';

import { useMainContext } from '@/hooks';
import api from '@/lib/data';

import {
  ChatContextProps,
  ChatContextShared,
  Conversation,
  ConversationStatus,
  MakeRequestParams,
  MessageFeedback,
  UpdateConversationPayload,
  UpdateWithCompletionPayload,
} from '@/lib/definitions';

import statusCodes from '@/lib/statusCodes';
import { revalidate } from '@/app/actions';
import { revalidateTag } from 'next/cache';

const ChatContext = createContext<ChatContextShared | undefined>(undefined);

export function ChatProvider(props: ChatContextProps) {
  const { makeRequest, user } = useMainContext();
  const [history, setHistory] = useState<Conversation[]>([]);

  const initialConversation: Conversation = {
    messages: [],
    status: 'open',
    userId: user?.id as string,
  };

  const [conversation, setConversation] = useState<Conversation>(
    props.conversation ?? initialConversation
  );

  // Request functions
  const deleteConversation = useCallback(
    async ({ id }: { id: string }) => {
      const successFn = async () => {
        setHistory(history.filter((conversation) => conversation.id !== id));
      };

      const params: MakeRequestParams<{ id: string }, {}> = {
        apiRequest: api.deleteConversation,
        payload: { id },
        successCode: statusCodes.OK,
        successFn,
      };

      return makeRequest(params);
    },
    [history, makeRequest]
  );

  const getHistory = useCallback(async () => {
    const successFn = async (data: Conversation[]) => {
      const sortedConversations = data.sort((a, b) => {
        const timeA = a.messages[a.messages.length - 1].time;
        const timeB = b.messages[b.messages.length - 1].time;
        return timeB - timeA;
      });

      setHistory(sortedConversations);
    };

    const params: MakeRequestParams<{ userId: string }, Conversation[]> = {
      apiRequest: api.fetchConversationsByUser,
      payload: { userId: user?.id as string },
      successCode: statusCodes.OK,
      successFn,
    };

    return makeRequest(params);
  }, [makeRequest, user]);

  const getReply = useCallback(
    async ({ content }: { content: string }) => {
      const previousConversation = { ...conversation };

      const updatedMessages = previousConversation.messages.concat({
        role: 'user',
        content,
        time: Date.now(),
      });

      const updatedConversation = { ...conversation, messages: updatedMessages };
      setConversation({ ...updatedConversation });

      const successFn = async (data: Conversation) => {
        setConversation({ ...data });
      };

      const errorFn = async () => {
        setConversation({ ...previousConversation });
      };

      const params: MakeRequestParams<UpdateWithCompletionPayload, Conversation> = {
        apiRequest: api.updateWithCompletion,
        payload: { body: updatedConversation },
        successCode: statusCodes.OK,
        successFn,
        errorFn,
      };

      return makeRequest(params);
    },
    [conversation, makeRequest]
  );

  const changeFeedback = useCallback(
    async ({ feedback }: { feedback: MessageFeedback }) => {
      const updatedMessages = [...conversation.messages];
      const lastIndex = updatedMessages.length - 1;
      updatedMessages[lastIndex].feedback = feedback;

      const payload: UpdateConversationPayload = {
        body: { messages: updatedMessages },
        id: conversation.id as string,
      };

      const params: MakeRequestParams<UpdateConversationPayload, Conversation> = {
        apiRequest: api.updateConversation,
        payload,
        successCode: statusCodes.OK,
      };

      return makeRequest(params);
    },
    [conversation, makeRequest]
  );

  const changeStatus = useCallback(
    async ({ status }: { status: ConversationStatus }) => {
      const payload: UpdateConversationPayload = {
        body: { status },
        id: conversation.id as string,
      };

      const successFn = async () => {
        setConversation({ ...conversation, status });
      };

      const params: MakeRequestParams<UpdateConversationPayload, Conversation> = {
        apiRequest: api.updateConversation,
        payload,
        successCode: statusCodes.OK,
        successFn,
      };

      return makeRequest(params);
    },
    [conversation, makeRequest]
  );

  const acceptConversation = useCallback(async () => {
    const body: Partial<Conversation> = {
      status: 'accepted',
      support: {
        collaboratorId: user?.id as string,
        messages: [],
      },
    };

    const payload: UpdateConversationPayload = {
      body,
      id: conversation.id as string,
    };

    const successFn = async () => {
      setConversation({ ...conversation, ...body });
      await revalidate({ tag: 'support' });
    };

    const params: MakeRequestParams<UpdateConversationPayload, Conversation> = {
      apiRequest: api.updateConversation,
      payload,
      successCode: statusCodes.OK,
      successFn,
    };

    return makeRequest(params);
  }, [conversation, makeRequest, user?.id]);

  const shared = {
    acceptConversation,
    changeStatus,
    changeFeedback,
    conversation,
    conversationLength: conversation.messages.length,
    deleteConversation,
    getHistory,
    getReply,
    history,
    initialConversation,
    setConversation,
  };

  return (
    <ChatContext.Provider value={{ ...shared }}>{props.children}</ChatContext.Provider>
  );
}

export default ChatContext;
