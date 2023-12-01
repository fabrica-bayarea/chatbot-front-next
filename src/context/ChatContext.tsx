'use client';

import { createContext, useCallback, useState } from 'react';

import { useMainContext } from '@/hooks';
import api from '@/lib/data';

import {
  ChatContextProps,
  ChatContextShared,
  Conversation,
  ConversationMessage,
  ConversationStatus,
  ConversationSupport,
  MakeRequestParams,
  MessageFeedback,
  SendEmailPayload,
  SendEmailResponse,
  UpdateConversationPayload,
  UpdateWithCompletionPayload,
} from '@/lib/definitions';

import statusCodes from '@/lib/statusCodes';
import { revalidate } from '@/app/actions';

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

  const changeFeedback = useCallback(
    async (feedback: MessageFeedback) => {
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

  const changeLastSent = useCallback(async () => {
    const support = conversation.support as ConversationSupport;
    const updatedSupport = { ...support, lastSent: Date.now() };

    const payload: UpdateConversationPayload = {
      body: { support: updatedSupport },
      id: conversation.id as string,
    };

    const successFn = async () => {
      setConversation({ ...conversation, support: updatedSupport });
    };

    const params: MakeRequestParams<UpdateConversationPayload, Conversation> = {
      apiRequest: api.updateConversation,
      payload,
      successCode: statusCodes.OK,
      successFn,
    };

    return makeRequest(params);
  }, [conversation, makeRequest]);

  const changeStatus = useCallback(
    async (status: ConversationStatus) => {
      const payload: UpdateConversationPayload = {
        body: { status },
        id: conversation.id as string,
      };

      const successFn = async () => {
        setConversation({ ...conversation, status });
        await revalidate({ tag: 'support' });
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

  const deleteConversation = useCallback(
    async (id: string) => {
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
    async (content: string) => {
      const previousConversation = { ...conversation };

      const updatedMessages = conversation.messages.concat({
        role: 'user',
        content,
        time: Date.now(),
      });

      const updatedConversation = { ...conversation, messages: updatedMessages };
      setConversation({ ...updatedConversation });

      const errorFn = async () => {
        setConversation({ ...previousConversation });
      };

      const successFn = async (data: Conversation) => {
        setConversation({ ...data });
      };

      const params: MakeRequestParams<UpdateWithCompletionPayload, Conversation> = {
        apiRequest: api.updateWithCompletion,
        errorFn,
        payload: { body: updatedConversation },
        successCode: statusCodes.OK,
        successFn,
      };

      return makeRequest(params);
    },
    [conversation, makeRequest]
  );

  const sendEmail = useCallback(async () => {
    const payload: SendEmailPayload = {
      body: {
        collaboratorName: user?.name as string,
        email: conversation.user?.email as string,
        id: conversation.id as string,
        messages: conversation.support?.messages as ConversationMessage[],
        name: conversation.user?.name as string,
      },
    };

    const successFn = async () => {
      await changeLastSent();
    };

    const params: MakeRequestParams<SendEmailPayload, SendEmailResponse> = {
      apiRequest: api.sendEmail,
      payload,
      successCode: statusCodes.OK,
      successFn,
    };

    return makeRequest(params);
  }, [changeLastSent, conversation, makeRequest, user?.name]);

  const sendReply = useCallback(
    async (content: string) => {
      const previousConversation = { ...conversation };
      const support = conversation.support as ConversationSupport;

      const updatedMessages = support.messages.concat({
        role: 'collaborator',
        content,
        time: Date.now(),
      });

      const updatedSupport = { ...support, messages: updatedMessages };

      setConversation({
        ...conversation,
        support: { ...updatedSupport },
      });

      const errorFn = async () => {
        setConversation({ ...previousConversation });
      };

      const payload: UpdateConversationPayload = {
        body: { support: updatedSupport },
        id: conversation.id as string,
      };

      const params: MakeRequestParams<UpdateConversationPayload, Conversation> = {
        apiRequest: api.updateConversation,
        errorFn,
        payload,
        successCode: statusCodes.OK,
      };

      return makeRequest(params);
    },
    [conversation, makeRequest]
  );

  const shared: ChatContextShared = {
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
    sendEmail,
    sendReply,
    setConversation,
    supportLength: conversation.support?.messages.length ?? 0,
  };

  return (
    <ChatContext.Provider value={{ ...shared }}>{props.children}</ChatContext.Provider>
  );
}

export default ChatContext;
