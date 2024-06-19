import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { fetchUserProfile } from '@/actions/auth';
import Logo from '@/components/Logo';

import styles from './home.module.css';

async function Layout({ children }: { children: ReactNode }) {
  const userProfile = await fetchUserProfile();

  return (
    <main className={styles.main}>
      {userProfile && userProfile.role !== 'user' && (
        <Link href={'/suporte'}>
          <Image
            src="/users_rectangle-white.svg"
            height={24}
            width={24}
            alt="Support link"
          />
        </Link>
      )}
      <Logo />
      <section className={styles.section}>{children}</section>
    </main>
  );
}

export default Layout;
