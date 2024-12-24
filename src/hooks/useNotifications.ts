'use client';

import { useEffect } from 'react';
import { useImmer } from 'use-immer';

import useMainContext from './useMainContext';
import { deleteNotifications, fetchNotifications } from '@/actions/notifications';
import type { Notification } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/client';

function useNotifications(id: string | null) {
  const { user } = useMainContext();
  const [notifications, setNotifications] = useImmer<Notification[]>([]);

  const getNotifications = async () => {
    if (!user) {
      return;
    }

    const data = await fetchNotifications(user.id);
    setNotifications(data);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    if (!id || !user) {
      return;
    }

    const supabase = createClient();

    const channel = supabase
      .channel(`notifications`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `recipient_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new.conversation_id !== id && payload.new.support_id !== id) {
            setNotifications((draft) => {
              draft.push(payload.new as Notification);
            });
          } else {
            deleteNotifications([payload.new as Notification]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, user]);

  return { notifications, setNotifications };
}

export default useNotifications;
