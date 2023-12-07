import type { ReactNode } from 'react';

import { getSession } from '@/app/actions';
import SupportSideBar from '@/components/SupportSideBar';
import api from '@/lib/data';
import { Conversation, Session } from '@/lib/definitions';

import styles from './support.module.css';

async function Layout({ children }: { children: ReactNode }) {
  const { user } = (await getSession()) as Session;

  const { data } = await api.fetchSupportConversations({
    collaboratorId: user.id,
  });

  // TODO
  // Check fetch status
  const conversations = data as Conversation[];

  return (
    <main className={styles.main}>
      <SupportSideBar conversations={conversations} />
      {children}
    </main>
  );
}

export default Layout;
