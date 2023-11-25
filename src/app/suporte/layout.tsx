import type { ReactNode } from 'react';

import SupportSideBar from '@/components/SupportSideBar';
import api from '@/lib/data';
import styles from './support.module.css';

async function Layout({ children }: { children: ReactNode }) {
  const { data } = await api.fetchHumanConversations();

  return (
    <main className={styles.main}>
      <SupportSideBar conversations={data} />
      {children}
    </main>
  );
}

export default Layout;
