'use client';

import Loading from './loading';
import { fetchConversationById } from '@/actions/conversations';
import Chat from '@/components/Chat';
import Dropdown from '@/components/Dropdown';
import Moved from '@/components/Moved';
import { useConversation } from '@/hooks';

function Page({ params }: { params: { id: string } }) {
  const { conversation } = useConversation(() => fetchConversationById(params.id));

  if (conversation === undefined) {
    return <Loading />;
  }

  if (conversation === null) {
    return <Moved />;
  }

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
