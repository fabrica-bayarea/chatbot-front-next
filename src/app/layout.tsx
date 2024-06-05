import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { extractRouterConfig } from 'uploadthing/server';

import { ourFileRouter } from './api/uploadthing/core';
import StyledComponentsRegistry from './registry';
import Toast from '@/components/Toast';
import { MainProvider } from '@/context';
import { createClient } from '@/utils/supabase/server';

import './globals.css';

export const metadata: Metadata = {
  title: 'Chatbot IESB',
  description: '',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user?.user_metadata;

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
