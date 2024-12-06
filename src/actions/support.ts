'use server';

import api from '@/utils/data';
import type { Conversation, SendEmailPayload, SupportStatus } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/server';

export async function fetchSupportList() {
  const supabase = createClient();
  const response = await supabase.rpc('fetch_support_list');

  return response;
}

export async function sendEndOfSupport(conversation: Conversation) {
  const supabase = createClient();
  const support = conversation.support_details;

  if (support) {
    const payload: SendEmailPayload = {
      body: {
        id: support.id,
        collaboratorProfile: support.collaborator_profile,
        ownerProfile: conversation.owner_profile,
        template: 'end-of-support',
      },
    };

    const { status } = await api.sendEmail(payload);

    if (status === 200) {
      const time = new Date().toISOString();

      await supabase
        .from('support')
        .update({ last_sent_at: time })
        .eq('id', support.id)
        .select();

      return 'ok';
    }
  }
}

export async function sendSupportUpdate(conversation: Conversation) {
  const supabase = createClient();
  const support = conversation.support_details;

  if (support) {
    const payload: SendEmailPayload = {
      body: {
        id: support.id,
        collaboratorProfile: support.collaborator_profile,
        ownerProfile: conversation.owner_profile,
        messages: conversation.messages,
        status: support.status,
        template: 'support-update',
      },
    };

    const { status } = await api.sendEmail(payload);

    if (status === 200) {
      const time = new Date().toISOString();

      await supabase
        .from('support')
        .update({ last_sent_at: time })
        .eq('id', support.id)
        .select();

      return 'ok';
    }
  }
}

export async function updateSupportRating(id: string, rating: number) {
  const supabase = createClient();

  const response = await supabase
    .from('support')
    .update({ rating })
    .eq('id', id)
    .select();

  return response;
}

export async function updateSupportStatus(id: string, status: SupportStatus) {
  const supabase = createClient();

  const response = await supabase
    .from('support')
    .update({ status })
    .eq('id', id)
    .select();

  return response;
}
