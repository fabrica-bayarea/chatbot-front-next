'use client';

import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

import { fetchConversationById } from '@/actions/conversations';
import type { Conversation, Message, Support } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/client';

function useConversation(
  returnFn: () => Conversation | null | Promise<Conversation | null>
) {
  const [conversation, setConversation] = useImmer<Conversation | null | undefined>(
    undefined
  );

  useEffect(() => {
    const getConversation = async () => {
      const data = await returnFn();
      setConversation(data);
    };

    getConversation();
  }, []);

  useEffect(() => {
    if (!conversation) {
      return;
    }

    const supabase = createClient();

    const channel = supabase
      .channel(conversation.id)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversations',
          filter: `id=eq.${conversation.id}`,
        },
        async () => {
          const data = await fetchConversationById(conversation.id);
          setConversation(data);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'human_messages',
          filter: `conversation_id=eq.${conversation.id}`,
        },
        async () => {
          const data = await fetchConversationById(conversation.id);
          setConversation(data);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation?.id]);

  useEffect(() => {
    if (!conversation || !conversation.active_support) {
      return;
    }

    const supabase = createClient();

    const channel = supabase
      .channel(conversation.active_support)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'support',
          filter: `id=eq.${conversation.active_support}`,
        },
        async () => {
          const data = await fetchConversationById(conversation.id);
          setConversation(data);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversation?.active_support]);

  return { conversation, setConversation };
}

export default useConversation;
