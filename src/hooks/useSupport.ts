'use client';

import type { RealtimeChannel } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { fetchSupport } from '@/app/actions';

function useSupport() {
  const [data, setData] = useState([]);

  const getSupport = async () => {
    const response = await fetchSupport();

    setData(response.data);
  };

  const subscribeToSupport = () => {
    const supabase = createClient();

    return supabase
      .channel('support-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'support' }, () => {
        getSupport();
      })
      .subscribe();
  };

  const unsubscribeFromSupport = (channel: RealtimeChannel) => {
    const supabase = createClient();
    return supabase.removeChannel(channel);
  };

  useEffect(() => {
    getSupport();
    const subscribedChannel = subscribeToSupport();

    return () => {
      unsubscribeFromSupport(subscribedChannel);
    };
  }, []);

  return { data };
}

export default useSupport;
