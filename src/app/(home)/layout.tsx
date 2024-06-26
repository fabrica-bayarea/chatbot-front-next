import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './home.module.css';
import { fetchUserProfile } from '@/actions/auth';

async function Layout({ children }: { children: ReactNode }) {
  const userProfile = await fetchUserProfile();

  return (
    <main className={styles.main}>
      {userProfile && userProfile.role !== 'user' && (
        <Link href={'/suporte'}>
          <Image
            src="/support_agent-white.svg"
            height={24}
            width={24}
            alt="Link para a página de suporte"
          />
        </Link>
      )}
      <div className={styles.logo}>
        <h1>Chatbot</h1>
        <Image
          src="/iesb_logo.png"
          height={100}
          width={100}
          quality={100}
          alt="Logo IESB"
          style={{ border: '3px solid white', boxSizing: 'content-box' }}
        />
      </div>
      <section className={styles.section}>{children}</section>
    </main>
  );
}

export default Layout;
