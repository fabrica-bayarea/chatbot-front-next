import type { ReactNode } from 'react';

import { getSession } from '@/app/actions';
import SupportSideBar from '@/components/SupportSideBar';
import api from '@/lib/data';
import { Conversation } from '@/lib/definitions';

import styles from './support.module.css';

async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  const { data } = await api.fetchSupportConversations({
    collaboratorId: session?.user.id as string,
  });

  const conversations = data as Conversation[];

  return (
    <main className={styles.main}>
      <SupportSideBar conversations={conversations} />
      {children}
    </main>
  );
}

export default Layout;
