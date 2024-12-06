import { useEffect, useState } from 'react';

import { createClient } from '@/utils/supabase/client';

function usePresence(userId: string | undefined) {
  const [presence, setPresence] = useState<string[]>([]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const supabase = createClient();
    const channel = supabase.channel('chatbot', {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        setPresence(Object.keys(channel.presenceState()));
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return presence;
}

export default usePresence;
