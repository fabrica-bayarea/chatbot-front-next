'use server';

import type { Notification } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/server';

export async function deleteNotifications(notifications: Notification[]) {
  if (notifications.length === 0) {
    return null;
  }

  const supabase = createClient();

  const response = await supabase
    .from('notifications')
    .delete()
    .in(
      'id',
      notifications.map((e) => e.id)
    );

  return response;
}

export async function fetchNotifications(recipientId: string) {
  const supabase = createClient();
  
  const response = await supabase
    .from('notifications')
    .select()
    .eq('recipient_id', recipientId);

  return response;
}
