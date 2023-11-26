import type { ReactNode } from 'react';

import { getSession } from '@/app/actions';
import SupportSideBar from '@/components/SupportSideBar';
import api from '@/lib/data';
import { UserType } from '@/types';

import styles from './support.module.css';

async function Layout({ children }: { children: ReactNode }) {
  const user = await getSession();
  const { data } = await api.fetchHumanConversations();

  return (
    <main className={styles.main}>
      <SupportSideBar conversations={data} user={user as UserType} />
      {children}
    </main>
  );
}

export default Layout;
