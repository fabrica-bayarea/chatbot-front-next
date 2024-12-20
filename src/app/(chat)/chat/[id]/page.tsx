'use client';

import Loading from './loading';
import { fetchConversationById } from '@/actions/conversations';
import Chat from '@/components/Chat';
import Dropdown from '@/components/Dropdown';
import Moved from '@/components/Moved';
import { ChatProvider } from '@/context';
import { useConversation } from '@/hooks';

function ChatPage({ params }: { params: { id: string } }) {
  const { conversation, setConversation } = useConversation(() =>
    fetchConversationById(params.id)
  );

  if (conversation === undefined) {
    return <Loading />;
  }

  if (conversation === null) {
    return <Moved />;
  }

  return (
    <ChatProvider>
      <section>
        <header>
          <Dropdown />
        </header>
        <Chat />
      </section>
    </ChatProvider>
  );
}

export default ChatPage;
