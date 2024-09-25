import { Public_Sans, Ubuntu } from 'next/font/google';

export const public_sans = Public_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-a',
});

export const ubuntu = Ubuntu({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-b',
  weight: '400',
});
