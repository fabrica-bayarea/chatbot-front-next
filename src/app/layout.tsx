import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { extractRouterConfig } from 'uploadthing/server';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';

import { ourFileRouter } from './api/uploadthing/core';
import StyledComponentsRegistry from './registry';
import { fetchProfile } from '@/actions/auth';
import Toast from '@/components/Toast';
import { MainProvider } from '@/context';

import './globals.css';

export const metadata: Metadata = {
  title: 'Chatbot IESB',
  description: '',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await fetchProfile();

  return (
    <html lang="en">
      <body>
        <MainProvider user={user}>
          <StyledComponentsRegistry>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <Toast />
            {children}
          </StyledComponentsRegistry>
        </MainProvider>
      </body>
    </html>
  );
}
