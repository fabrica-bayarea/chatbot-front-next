'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import Chat from '@/components/Chat';
import Dropdown from '@/components/Dropdown';
import UnauthChat from '@/components/Chat/UnauthChat';
import ChatSideBar from '@/components/ChatSideBar';
import { ChatProvider } from '@/context';
import { useMainContext } from '@/hooks';
import { mediaQueries } from '@/utils/mediaQueries';

const Main = styled.main`
  display: flex;
  min-height: 100dvh;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 10;

  & > header {
    align-items: center;
    background-color: var(--clr-b);
    background-image: linear-gradient(
      to bottom right,
      rgba(255 255 255 / 8%),
      rgba(255 255 255 / 0%) 80%
    );
    color: white;
    display: flex;
    height: 80px;
    justify-content: space-between;
    padding: 0 30px;
    width: 100%;

    & > span {
      font-size: 1.5rem;
    }
  }
`;

const OpenCloseContainer = styled.div`
  visibility: hidden;
  z-index: 1000;

  ${mediaQueries.laptopS} {
    visibility: visible;
  }
`;

function Home() {
  const { user } = useMainContext();
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <ChatProvider>
      <Main>
        <ChatSideBar isVisible={showSideBar} showFn={setShowSideBar} />
        <Section>
          <header>
            <OpenCloseContainer>
              <button onMouseDown={() => setShowSideBar(!showSideBar)}>
                <Image
                  src={showSideBar ? '/xmark.svg' : '/bars-white.svg'}
                  height={24}
                  width={24}
                  alt="Alternar menu lateral"
                />
              </button>
            </OpenCloseContainer>
            {user && <Dropdown showFn={setShowSideBar} />}
          </header>
          {user ? <Chat /> : <UnauthChat />}
        </Section>
      </Main>
    </ChatProvider>
  );
}

export default Home;
