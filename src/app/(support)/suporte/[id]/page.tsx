import Link from 'next/link';

import { getSession } from '@/app/actions';
import SupportChat from '@/components/SupportChat';
import SupportHeader from '@/components/SupportHeader';
import { ChatProvider } from '@/context';
import api from '@/lib/data';
import type { Conversation, Session, SupportProps } from '@/lib/definitions';

import styles from '../../support.module.css';

async function Support({ params }: SupportProps) {
  const { user } = (await getSession()) as Session;

  const { data } = await api.fetchSupportConversations({
    collaboratorId: user.id,
  });

  // TODO
  // Check fetch status
  const conversations = data as Conversation[];
  const [conversation] = conversations.filter(({ id }) => id === params.id);

  if (!conversation) {
    return (
      <section className={`${styles.section} ${styles.closed}`}>
        <span>Esta conversa não existe ou foi encerrada.</span>
        <Link href={'/suporte'}>Página inicial</Link>
      </section>
    );
  }

  return (
    <ChatProvider conversation={conversation}>
      <section className={styles.section}>
        <SupportHeader />
        <SupportChat />
      </section>
    </ChatProvider>
  );
}

export default Support;
