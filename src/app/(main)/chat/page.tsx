import { getSession } from '@/app/actions';
import Dropdown from '@/components/Dropdown';
import NewChat from '@/components/NewChat';
import { ChatProvider } from '@/context';
import { Session } from '@/lib/definitions';

async function Home() {
  const { user } = (await getSession()) as Session;
  const [firstName] = user.name.split(' ');

  return (
    <ChatProvider>
      <header>
        <span>{`Olá, ${firstName}! 👋`}</span>
        <Dropdown />
      </header>
      <NewChat />
    </ChatProvider>
  );
}

export default Home;
