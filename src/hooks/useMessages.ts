'use client';

import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { v4 as uuidv4 } from 'uuid';

import useMainContext from './useMainContext';
import { createAIMessage, createHumanMessage } from '@/actions/messages';
import api from '@/utils/data';
import type { Conversation, Message, MessageRole } from '@/utils/definitions';

function useMessages(conversation: Conversation | null | undefined) {
  const { user } = useMainContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useImmer<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean | undefined>(undefined);

  const composeMessage = (content: string, role: MessageRole): Message => ({
    id: uuidv4(),
    conversation_id: conversation?.id as string,
    content,
    created_at: new Date().toISOString(),
    role,
    owner_profile: role === 'assistant' ? null : user,
  });

  const decodeStream = async (reader: ReadableStreamDefaultReader) => {
    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const decodedValue = new TextDecoder().decode(value);

        setMessages((draft) => {
          draft[draft.length - 1].content += decodedValue;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      reader.releaseLock();
    }
  };

  const getStream = async (content: string) => {
    try {
      setIsStreaming(true);
      const humanMessage = composeMessage(content, 'user');

      const newMessages = messages.concat(humanMessage);

      setMessages(newMessages);

      const reader = await api.fetchStream({ body: { messages: newMessages } });
      const aiMessage = composeMessage('', 'assistant');

      setMessages((draft) => {
        draft.push(aiMessage);
      });

      await decodeStream(reader);
    } catch (error) {
      console.error(error);
    } finally {
      setIsStreaming(false);
    }
  };

  const sendMessage = async (content: string, role: MessageRole) => {
    try {
      setIsLoading(true);
      const humanMessage = composeMessage(content, role);
      setMessages(messages.concat(humanMessage));
      await createHumanMessage(humanMessage);
    } catch (error) {
      console.error(error);
      setMessages(messages.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation?.messages]);

  useEffect(() => {
    const updateMessages = async () => {
      await createAIMessage(messages.slice(-1)[0]);
      await createHumanMessage(messages.slice(-2)[0]);
    };

    if (isStreaming === false) {
      updateMessages();
    }
  }, [isStreaming]);

  return { messages, isLoading, isStreaming, getStream, sendMessage };
}

export default useMessages;
