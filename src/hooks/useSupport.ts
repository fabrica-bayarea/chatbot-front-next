'use client';

import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

import { fetchSupportById } from '@/actions/support';
import { Support } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/client';

function useSupport(supportId: string) {
  const [support, setSupport] = useImmer<Support | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const getSupport = async () => {
    setIsLoading(true);
    const data = await fetchSupportById(supportId);
    setSupport(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getSupport();
    const supabase = createClient();

    const channel = supabase
      .channel(supportId)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'support',
          filter: `id=eq.${supportId}`,
        },
        async (payload) => {
          console.log('Change received!', payload);
          const data = await fetchSupportById(supportId);
          setSupport(data);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { support, isLoading, setSupport };
}

export default useSupport;
