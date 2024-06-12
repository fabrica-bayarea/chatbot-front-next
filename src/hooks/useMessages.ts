import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createHumanMessage, fetchProfile } from '@/app/actions';
import useMainContext from './useMainContext';

function useMessages(data) {
  const { user } = useMainContext();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([...data.messages]);

  const addNewMessage = async (content) => {
    try {
      setIsLoading(true);
      const newMessage = {
        id: uuidv4(),
        role: 'collaborator',
        content,
        user_profile: user,
        time: Date.now(),
      };

      setMessages(messages.concat(newMessage));
      console.log(newMessage);

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
