'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import styled from 'styled-components';

import { signOut } from '@/actions/auth';
import { IconButton } from '@/components/styled';
import { SupportSidebar } from '@/components/Support';

const Header = styled.header`
  background-color: var(--clr-c);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
  display: flex;
  height: 40px;
  justify-content: flex-end;
  padding: 0 60px;
  position: relative;
  z-index: 100;

  & > nav {
    display: flex;
    gap: 40px;
  }

  @media screen and (width <= 1024px) {
    padding: 0 12px 0 20px;

    & > nav {
      gap: 20px;
    }
  }
`;

const Container = styled.main`
  display: flex;
  min-height: calc(100dvh - 40px);

  & > section {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <>
      <Header>
        <nav>
          <IconButton onClick={() => router.push('/')}>
            <Image src="/home-white.svg" height={18} width={18} alt="Página principal" />
          </IconButton>
          <IconButton onClick={() => router.push('/suporte')}>
            <Image src="/bar_chart-white.svg" height={18} width={18} alt="Painel" />
          </IconButton>
          <IconButton onClick={() => signOut()}>
            <Image src="/logout-white.svg" height={18} width={18} alt="Logout" />
          </IconButton>
        </nav>
      </Header>
      <Container>
        <SupportSidebar />
        {children}
      </Container>
    </>
  );
}

export default Layout;
