import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createHumanMessage } from '@/app/actions';
import useMainContext from './useMainContext';
import { Message, Support } from '@/utils/definitions';

function useMessages(data: Support) {
  const { user } = useMainContext();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([...data.messages]);

  const addNewMessage = async (content: string) => {
    try {
      setIsLoading(true);
      const newMessage: Message = {
        id: uuidv4(),
        role: 'collaborator',
        content,
        owner_profile: user,
        created_at: new Date().toISOString(),
      };

      setMessages(messages.concat(newMessage));
      await createHumanMessage(data.conversation_id, newMessage);
    } catch (error) {
      setMessages(messages.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, addNewMessage };
}

export default useMessages;
