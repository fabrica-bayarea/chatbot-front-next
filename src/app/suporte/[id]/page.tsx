import SupportChat from '@/components/SupportChat';
import SupportHeader from '@/components/SupportHeader';

import api from '@/lib/data';

async function Support({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data } = await api.fetchConversation({ id });

  return (
    <section>
      <SupportHeader conversation={data} />
      <SupportChat conversation={data} />
    </section>
  );
}

export default Support;
