'use client';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import useMainContext from './useMainContext';
import { createHumanMessage } from '@/actions/messages';
import type { Conversation, Message, Support } from '@/utils/definitions';

function useMessages(conversation: Conversation) {
  const { user } = useMainContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);

      const newMessage: Message = {
        id: uuidv4(),
        conversation_id: conversation.id,
        content,
        created_at: new Date().toISOString(),
        role: 'collaborator',
        owner_profile: user,
      };

      setMessages(messages.concat(newMessage));
      await createHumanMessage(newMessage);
    } catch (error) {
      setMessages(messages.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation]);

  return { messages, isLoading, sendMessage };
}

export default useMessages;
