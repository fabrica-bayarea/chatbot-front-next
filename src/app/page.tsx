'use client';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import { Chat, Dropdown, History, Logo } from '@/components';
import { Main, Section } from '@/components/styled';
import { ChatProvider } from '@/context';
import { useMainContext } from '@/hooks';
import { mediaQueries } from '@/utils';
import Link from 'next/link';

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

const App = styled(Section)`
  & > div {
    height: 600px;
  }

  ${mediaQueries.laptopS} {
    & > div {
      height: 500px;
    }
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
        <App>
          <header>
            <span>Olá, {user?.name}! 👋</span>
            <Dropdown showFn={setShowHistory} />
          </header>
          <div>{showHistory ? <History showFn={setShowHistory} /> : <Chat />}</div>
        </App>
      </Container>
    </ChatProvider>
  );
}

export default Home;
