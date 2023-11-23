import SupportChat from '@/components/SupportChat';
import SupportHeader from '@/components/SupportHeader';

async function getConversation({ id }: { id: string }) {
  const response = await fetch(`http://localhost:3100/conversations/${id}?_expand=user`, {
    next: { revalidate: 10 },
  });

  const result = await response.json();

  return result;
}

async function Support({ params }: { params: { id: string } }) {
  const id = params.id;
  const conversation = await getConversation({ id });

  return (
    <>
      <SupportHeader conversation={conversation} />
      <SupportChat conversation={conversation} />
    </>
  );
}

export default Support;
