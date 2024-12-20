'use client';

import Chat from '@/components/Chat';
import Dropdown from '@/components/Dropdown';
import UnauthChat from '@/components/Chat/UnauthChat';
import { ChatProvider } from '@/context';
import { useMainContext } from '@/hooks';

function Home() {
  const { user } = useMainContext();

  return (
    <ChatProvider>
      <section>
        <header>{user && <Dropdown />}</header>
        {user ? <Chat /> : <UnauthChat />}
      </section>
    </ChatProvider>
  );
}

export default Home;
