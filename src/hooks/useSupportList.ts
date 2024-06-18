'use client';

import { useEffect, useState } from 'react';

import { fetchSupportList } from '@/app/actions';
import { createClient } from '@/utils/supabase/client';
import { Support } from '@/utils/definitions';

function useSupportList() {
  const [supportList, setSupportList] = useState<Support[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSupportList = async () => {
    setIsLoading(true);
    const { data } = await fetchSupportList();
    
    setSupportList(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getSupportList();
    const supabase = createClient();

    const channel = supabase
      .channel('support-list')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'support' },
        async (payload) => {
          console.log('Change received!', payload);
          const { data } = await fetchSupportList();
          setSupportList(data);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { supportList, isLoading };
}

export default useSupportList;
