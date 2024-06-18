'use client';

import Link from 'next/link';

import SupportChat from '@/components/SupportChat';
import SupportHeader from '@/components/SupportHeader';
import { useSupport } from '@/hooks';
import { Updater } from 'use-immer';
import { Support } from '@/utils/definitions';

function SupportPage({ params }: { params: { id: string } }) {
  const { support, setSupport } = useSupport(params.id);

  if (support === undefined) {
    return <section>Loading</section>;
  }

  if (support === null) {
    return (
      <section>
        <span>Esta conversa não existe ou foi movida.</span>
        <Link href={'/suporte'}>Página inicial</Link>
      </section>
    );
  }

  return (
    <section>
      <SupportHeader data={support} setSupport={setSupport as Updater<Support>} />
      <SupportChat data={support} />
    </section>
  );
}

export default SupportPage;
