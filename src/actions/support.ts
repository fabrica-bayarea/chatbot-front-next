'use server';

import { fetchProfile } from './auth';
import api from '@/utils/data';
import { Message, SendEmailPayload, Support, SupportStatus } from '@/utils/definitions';
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

export async function sendSupport(id: string) {
  const supabase = createClient();
  const profile = await fetchProfile();
  const support = await fetchSupportById(id);

  if (support) {
    const payload: SendEmailPayload = {
      body: {
        collaboratorName: profile.name as string,
        email: support.owner_profile.email as string,
        id: support.id as string,
        messages: support.messages as Message[],
        name: support.owner_profile.name as string,
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

export async function updateSupportStatus(id: string, status: SupportStatus) {
  const supabase = createClient();

  const response = await supabase
    .from('support')
    .update({ status })
    .eq('id', id)
    .select();

  return response;
}
