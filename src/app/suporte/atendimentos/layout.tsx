'use client';

import { type ReactNode } from 'react';

import { SupportSidebar } from '@/components/Support';

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SupportSidebar />
      {children}
    </>
  );
}

export default Layout;
