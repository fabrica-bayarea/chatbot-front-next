import Link from 'next/link';

import { getSession } from '@/app/actions';
import Chat from '@/components/Chat';
import Dropdown from '@/components/Dropdown';
import { ChatProvider } from '@/context';
import api from '@/lib/data';
import { Conversation, HomeProps, Session } from '@/lib/definitions';

async function Home({ params }: HomeProps) {
  const { user } = (await getSession()) as Session;
  const [firstName] = user.name.split(' ');

  const { data } = await api.fetchConversationsByUser({
    userId: user.id,
  });

  // TODO
  // Check fetch status
  const conversations = data as Conversation[];
  const [conversation] = conversations.filter(({ id }) => id === params.id);

  return (
    <ChatProvider conversation={conversation}>
      <header>
        <span>{`Olá, ${firstName}! 👋`}</span>
        <Dropdown />
      </header>
      {conversation ? (
        <Chat />
      ) : (
        <div>
          <span>Conversa não encontrada.</span>
          <Link href={'/chat'}>Página inicial</Link>
        </div>
      )}
    </ChatProvider>
  );
}

export default Home;
