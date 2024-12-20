'use client';

import { type Updater } from 'use-immer';

import Loading from './loading';
import { fetchConversationBySupportId } from '@/actions/conversations';
import Moved from '@/components/Moved';
import { SupportChat, SupportHeader } from '@/components/Support';
import { useConversation } from '@/hooks';
import type { Conversation, Support } from '@/utils/definitions';

function SupportPage({ params }: { params: { id: string } }) {
  const { conversation, setConversation } = useConversation(() =>
    fetchConversationBySupportId(params.id)
  );

  if (conversation === undefined) {
    return <Loading />;
  }

  if (conversation === null) {
    return <Moved />;
  }

  return (
    <section>
      <SupportHeader
        conversation={conversation}
        setConversation={setConversation as Updater<Conversation>}
      />
      <SupportChat conversation={conversation} />
    </section>
  );
}

export default SupportPage;
