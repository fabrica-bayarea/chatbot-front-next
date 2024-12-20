'use client';

import NewChat from '@/components/Chat/NewChat';
import UnauthChat from '@/components/Chat/UnauthChat';
import Dropdown from '@/components/Dropdown';
import { ChatProvider } from '@/context';
import { useMainContext } from '@/hooks';

function Home() {
  const { user } = useMainContext();

  return (
    <ChatProvider>
      <section>
        <header>{user && <Dropdown />}</header>
        {user ? <NewChat /> : <UnauthChat />}
      </section>
    </ChatProvider>
  );
}

export default Home;
