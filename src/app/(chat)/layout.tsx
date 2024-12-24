'use client';

import { type ReactNode } from 'react';
import styled from 'styled-components';

import ChatSideBar from '@/components/ChatSideBar';

const Main = styled.main`
  display: flex;
  min-height: 100dvh;

  & > section {
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
      justify-content: flex-end;
      padding: 0 30px;
      width: 100%;

      & > span {
        font-size: 1.5rem;
      }
    }
  }
`;

function Layout({ children }: { children: ReactNode }) {
  return (
    <Main>
      <ChatSideBar />
      {children}
    </Main>
  );
}

export default Layout;
