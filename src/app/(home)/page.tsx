'use client';

import { useState } from 'react';

import Chat from '@/components/Chat';
import Dropdown from '@/components/Dropdown';
import History from '@/components/History';
import { ChatProvider } from '@/context';
import { useMainContext } from '@/hooks';

function Home() {
  const { user } = useMainContext();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <ChatProvider>
      <header>
        <span>Olá, {user?.name?.split(' ')[0]}! 👋</span>
        <Dropdown showFn={setShowHistory} />
      </header>
      <div>{showHistory ? <History showFn={setShowHistory} /> : <Chat />}</div>
    </ChatProvider>
  );
}

export default Home;
