'use client';

import { type Updater } from 'use-immer';

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

  const { conversation, setConversation } = useConversation(newConversation);

  return (
    <section>
      <header>
        <Dropdown />
      </header>
      <Chat
        conversation={conversation}
        setConversation={setConversation as Updater<Conversation>}
      />
    </section>
  );
}

export default Page;
