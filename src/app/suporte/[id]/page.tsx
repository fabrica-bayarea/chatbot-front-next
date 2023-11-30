import { getSession } from '@/app/actions';
import SupportChat from '@/components/SupportChat';
import SupportHeader from '@/components/SupportHeader';
import { ChatProvider } from '@/context';
import api from '@/lib/data';
import type { ConversationExpanded, SupportProps } from '@/lib/definitions';

async function Support({ params }: SupportProps) {
  const session = await getSession();

  const { data } = await api.fetchSupportConversations({
    collaboratorId: session?.user.id as string,
  });

  const conversations = data as ConversationExpanded[];
  const [conversation] = conversations.filter(({ id }) => id === params.id);

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
