import Link from 'next/link';

import { getSession } from '@/app/actions';
import SupportChat from '@/components/SupportChat';
import SupportHeader from '@/components/SupportHeader';
import { ChatProvider } from '@/context';
import api from '@/lib/data';
import type { Conversation, SupportProps } from '@/lib/definitions';

import styles from '../support.module.css';

async function Support({ params }: SupportProps) {
  const session = await getSession();

  const { data } = await api.fetchSupportConversations({
    collaboratorId: session?.user.id as string,
  });

  const conversations = data as Conversation[];
  const [conversation] = conversations.filter(({ id }) => id === params.id);

  if (!conversation) {
    return (
      <section className={styles.closed}>
        <span>Esta conversa não existe ou foi encerrada.</span>
        <Link href={'/suporte'}>Página inicial</Link>
      </section>
    );
  }

  return (
    <ChatProvider conversation={conversation}>
      <section>
        <SupportHeader />
        <SupportChat />
      </section>
    </ChatProvider>
  );
}

export default Support;
