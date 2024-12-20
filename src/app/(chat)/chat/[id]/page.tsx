'use client';

import Chat from '@/components/Chat';
import Dropdown from '@/components/Dropdown';
import { ChatProvider } from '@/context';

function Home() {
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

export default Home;
