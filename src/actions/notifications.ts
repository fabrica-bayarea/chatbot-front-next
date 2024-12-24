'use server';

import type { Notification } from '@/utils/definitions';
import { createClient } from '@/utils/supabase/server';

export async function deleteNotifications(notifications: Notification[]) {
  if (notifications.length === 0) {
    throw new Error('No notifications to delete');
  }

  const supabase = createClient();

  const response = await supabase
    .from('notifications')
    .delete()
    .in(
      'id',
      notifications.map((e) => e.id)
    );

  if (response.error) {
    throw new Error(response.error.message);
  }

  return true;
}

export async function fetchNotifications(recipientId: string): Promise<Notification[]> {
  const supabase = createClient();
  
  const response = await supabase
    .from('notifications')
    .select()
    .eq('recipient_id', recipientId);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data as Notification[];
}
