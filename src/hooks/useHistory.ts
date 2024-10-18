'use client';

import { useEffect, useState } from 'react';

import useMainContext from './useMainContext';
import { fetchHistory } from '@/actions/conversations';
import type { Conversation } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/client';

function useHistory() {
  const { user } = useMainContext();
  const [history, setHistory] = useState<Conversation[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getHistory = async () => {
    setIsLoading(true);
    const { data } = await fetchHistory();

    setHistory(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getHistory();
    const supabase = createClient();

    const handleChange = async () => {
      const { data } = await fetchHistory();
      setHistory(data);
    };

    const channel = supabase
      .channel('support-list')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'human_messages',
          filter: `owner_id=eq.${user?.id}`,
        },
        handleChange
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
          filter: `owner_id=eq.${user?.id}`,
        },
        handleChange
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { history, isLoading };
}

export default useHistory;
