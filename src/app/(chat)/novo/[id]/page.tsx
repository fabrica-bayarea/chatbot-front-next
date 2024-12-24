'use client';

import Chat from '@/components/Chat';
import Dropdown from '@/components/Dropdown';
import { useConversation, useMainContext } from '@/hooks';
import type { Conversation, Profile } from '@/utils/definitions';

function Page({ params }: { params: { id: string } }) {
  const { user } = useMainContext();

  const newConversation: Conversation = {
    id: params.id,
    owner_id: user?.id as string,
    created_at: new Date().toISOString(),
    status: 'open',
    active_support: null,
    messages: [],
    owner_profile: user as Profile,
    support_details: null,
  };

  const { conversation } = useConversation(newConversation);

  return (
    <section>
      <header>
        <Dropdown />
      </header>
      <Chat conversation={conversation} />
    </section>
  );
}

export default Page;
