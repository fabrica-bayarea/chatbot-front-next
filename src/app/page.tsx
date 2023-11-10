'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { Chat, Dropdown, History, Logo } from '@/components';
import { Main, Section } from '@/components/styled';
import { ChatProvider } from '@/context';
import { useMainContext } from '@/hooks';
import { devices } from '@/utils';

const HomeSection = styled(Section)`
  & > div {
    height: 600px;
  }

  @media ${devices.laptopS} {
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
      <Main>
        <Logo />
        <HomeSection>
          <header>
            <span>Olá, {user?.name}! 👋</span>
            <Dropdown showFn={setShowHistory} />
          </header>
          <div>{showHistory ? <History showFn={setShowHistory} /> : <Chat />}</div>
        </HomeSection>
      </Main>
    </ChatProvider>
  );
}

export default Home;
