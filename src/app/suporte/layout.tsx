'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import { Header, Main } from './support.styled';

import { signOut } from '@/actions/auth';
import { IconButton } from '@/components/styled';
import { SupportSidebar } from '@/components/Support';

function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <>
      <Header>
        <nav>
          <IconButton onClick={() => router.push('/')}>
            <Image
              src="/home-white.svg"
              height={18}
              width={18}
              alt="Link para a página principal"
            />
          </IconButton>
          <IconButton onClick={() => router.push('/suporte')}>
            <Image
              src="/bar_chart-white.svg"
              height={18}
              width={18}
              alt="Link para o painel"
            />
          </IconButton>
          <IconButton onClick={() => signOut()}>
            <Image src="/logout-white.svg" height={18} width={18} alt="Logout" />
          </IconButton>
        </nav>
      </Header>
      <Main>
        <SupportSidebar />
        {children}
      </Main>
    </>
  );
}

export default Layout;
