'use client';

import { useEffect, useState } from 'react';

import { fetchHistory } from '@/actions/conversations';
import type { Conversation } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/client';

function useHistory() {
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

    const channel = supabase
      .channel('support-list')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'human_messages' },
        async (payload) => {
          console.log('Change received!', payload);
          const { data } = await fetchHistory();
          setHistory(data);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { history, isLoading };
}

export default useHistory;
