'use client';

import Image from 'next/image';
import { type ReactNode } from 'react';
import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

const Header = styled.header`
  align-items: center;
  background-color: var(--clr-c);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
  display: flex;
  height: 50px;
  justify-content: flex-end;
  padding: 0 60px;
  position: relative;
  z-index: 100;

  ${mediaQueries.laptopS} {
    padding: 0 30px;
  }
`;

const Main = styled.main`
  background-color: var(--clr-lighter-gray);
  background-image: linear-gradient(to top, var(--clr-light-gray), transparent 10%);
  display: flex;
  min-height: calc(100dvh - 50px);

  & > section {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header>
        <Image
          src="/iesb-logo-sm.png"
          height={24}
          width={80}
          quality={100}
          alt="Logo IESB"
        />
      </Header>
      <Main>{children}</Main>
    </>
  );
}

export default Layout;
