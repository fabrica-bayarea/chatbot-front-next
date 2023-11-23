import type { ReactNode } from 'react';

import SupportSideBar from '@/components/SupportSideBar';
import styles from './support.module.css';

async function getConversations() {
  const response = await fetch(
    'http://localhost:3100/conversations?status=redirected&_expand=user',
    { next: { revalidate: 10 } }
  );

  const result = await response.json();

  return result;
}

async function Layout({ children }: { children: ReactNode }) {
  const conversations = await getConversations();

  return (
    <main className={styles.main}>
      <SupportSideBar conversations={conversations} />
      <section>{children}</section>
    </main>
  );
}

export default Layout;
