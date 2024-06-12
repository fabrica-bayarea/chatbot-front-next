import { fetchProfile } from '@/app/actions';
import { useState } from 'react';

function useMessages(initialMessages) {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([...initialMessages]);

  const addNewMessage = async (content) => {
    try {
      setIsLoading(true);

      const user_profile = await fetchProfile();

      setMessages(
        messages.concat({
          role: user_profile.role,
          content,
          user_profile,
          time: Date.now(),
        })
      );
    } catch (error) {
      setMessages(messages.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, addNewMessage };
}

export default useMessages;
