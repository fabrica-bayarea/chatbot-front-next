import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { type Metadata } from 'next';
import { type ReactNode } from 'react';
import { extractRouterConfig } from 'uploadthing/server';

import './globals.css';
import { ourFileRouter } from './api/uploadthing/core';
import { public_sans, ubuntu } from './fonts';
import StyledComponentsRegistry from './registry';
import { fetchUserProfile } from '@/actions/auth';
import CookieNotice from '@/components/CookieNotice';
import Toast from '@/components/Toast';
import { MainProvider } from '@/context';

export const metadata: Metadata = {
  title: 'Chatbot IESB',
  description: '',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const userProfile = await fetchUserProfile();

  return (
    <html lang="en" className={`${public_sans.variable} ${ubuntu.variable}`}>
      <body>
        <MainProvider user={userProfile}>
          <StyledComponentsRegistry>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <CookieNotice />
            <Toast />
            {children}
          </StyledComponentsRegistry>
        </MainProvider>
      </body>
    </html>
  );
}
