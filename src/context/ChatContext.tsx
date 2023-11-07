'use client';

import { ReactNode, createContext, useState } from 'react';

import api from '@/api';
import { useMainContext } from '@/hooks';
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
  const [conversationId, setConversationId] = useState<null | string>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [history, setHistory] = useState<ConversationType[]>([]);

  // Request functions
  const deleteConversation = async (payload: { id: string }) => {
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
  };

  const getHistory = async () => {
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
  };

  //   const getReply = useCallback(
  //     async (content) => {
  //       const newMessages = messages.concat({
  //         role: 'user',
  //         content,
  //         time: new Date().getTime(),
  //       });

  //       setMessages(newMessages);
  //       const body = { conversationId, userId: user.id, messages: newMessages };

  //       const successFn = (data) => {
  //         if (!conversationId) {
  //           setConversationId(data.conversationId);
  //         }
  //         setMessages(data.messages);
  //       };

  //       return makeRequest(api.fetchReply, { body }, statusCodes.OK, successFn);
  //     },
  //     [conversationId, makeRequest, messages, user?.id]
  //   );

  // Other functions
  const changeConversation = (id: null | string, messages: ChatMessageType[]) => {
    setConversationId(id);
    setMessages(messages);
  };

  const shared = {
    messages,
    history,
    setHistory,
    changeConversation,
    deleteConversation,
    getHistory,
    // getReply,
  };

  return <ChatContext.Provider value={{ ...shared }}>{children}</ChatContext.Provider>;
}

export default ChatContext;
