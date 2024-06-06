'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

import Chat from '@/components/Chat';
import Dropdown from '@/components/Dropdown';
import History from '@/components/History';
import Logo from '@/components/Logo';
import { Main, Section } from '@/components/styled';
import { ChatProvider } from '@/context';
import { useMainContext } from '@/hooks';

const Container = styled(Main)`
  & > a {
    aspect-ratio: 1;
    display: flex;
    left: 20px;
    position: absolute;
    top: 20px;
    width: 30px;
  }
`;

function Home() {
  const { user } = useMainContext();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <ChatProvider>
      <Container>
        {(user?.role === 'admin' || user?.role === 'collaborator') && (
          <Link href={'/suporte'}>
            <Image
              src="/users_rectangle-white.svg"
              height={24}
              width={24}
              alt="Support link"
            />
          </Link>
        )}
        <Logo />
        <Section>
          <header>
            <span>Olá, {user?.name?.split(' ')[0]}! 👋</span>
            <Dropdown showFn={setShowHistory} />
          </header>
          <div>{showHistory ? <History showFn={setShowHistory} /> : <Chat />}</div>
        </Section>
      </Container>
    </ChatProvider>
  );
}

export default Home;
