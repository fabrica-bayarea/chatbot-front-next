import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { getSession } from '@/app/actions';
import Logo from '@/components/Logo';

import styles from './main.module.css';

async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <main className={styles.main}>
      {session?.user.role === 'admin' || session?.user.role === 'collaborator' ? (
        <Link href={'/suporte'}>
          <Image
            src="/users_rectangle-white.svg"
            height={24}
            width={24}
            alt="Support link"
          />
        </Link>
      ) : null}
      <Logo />
      <section className={styles.section}>{children}</section>
    </main>
  );
}

export default Layout;
