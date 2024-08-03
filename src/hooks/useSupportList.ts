'use client';

import { useEffect, useState } from 'react';

import { fetchSupportList } from '@/actions/support';
import { Support } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/client';

function useSupportList() {
  const [supportList, setSupportList] = useState<Support[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSupportList = async () => {
    setIsLoading(true);
    const { data } = await fetchSupportList();

    setSupportList(data);
    setIsLoading(false);
  };

  const playAudio = () => {
    const audio = new Audio('/audio/notification.mp3');
    audio.play();
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

          if (payload.eventType === 'INSERT') {
            playAudio();
          }

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
