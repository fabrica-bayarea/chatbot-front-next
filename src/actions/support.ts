'use server';

import { fetchUserProfile } from './auth';
import api from '@/utils/data';
import { SendEmailPayload, Support, SupportStatus } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/server';

export async function fetchSupportById(supportId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .rpc('fetch_support_by_id', {
      support_id: supportId,
    })
    .single();

  if (error) {
    console.log(error);
  }

  return data as Support | null;
}

export async function fetchSupportList() {
  const supabase = createClient();
  const response = await supabase.rpc('fetch_support_list');

  return response;
}

export async function sendEndOfSupport(id: string) {
  const supabase = createClient();
  const userProfile = await fetchUserProfile();
  const support = await fetchSupportById(id);

  if (support) {
    const payload: SendEmailPayload = {
      body: {
        id: support.id,
        collaboratorProfile: userProfile,
        ownerProfile: support.owner_profile,
        template: 'end-of-support',
      },
    };

    const { status } = await api.sendEmail(payload);

    if (status === 200) {
      const time = new Date().toISOString();
      await supabase.from('support').update({ last_sent_at: time }).eq('id', id).select();

      return 'ok';
    }
  }
}

export async function sendSupportUpdate(id: string) {
  const supabase = createClient();
  const userProfile = await fetchUserProfile();
  const support = await fetchSupportById(id);

  if (support) {
    const payload: SendEmailPayload = {
      body: {
        id: support.id,
        collaboratorProfile: userProfile,
        ownerProfile: support.owner_profile,
        messages: support.messages,
        status: support.status,
        template: 'support-update',
      },
    };

    const { status } = await api.sendEmail(payload);

    if (status === 200) {
      const time = new Date().toISOString();
      await supabase.from('support').update({ last_sent_at: time }).eq('id', id).select();

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
