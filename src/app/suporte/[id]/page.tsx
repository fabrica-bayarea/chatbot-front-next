'use client';

import Link from 'next/link';
import { type Updater } from 'use-immer';

import Loading from './loading';
import { SupportChat, SupportHeader } from '@/components/Support';
import { useSupport } from '@/hooks';
import type { Support } from '@/utils/definitions';

function Moved() {
  return (
    <section>
      <span>Esta conversa não existe ou foi movida.</span>
      <Link href={'/suporte'}>Página inicial</Link>
    </section>
  );
}

function SupportPage({ params }: { params: { id: string } }) {
  const { support, setSupport } = useSupport(params.id);

  if (support === undefined) {
    return <Loading />;
  }

  if (support === null) {
    return <Moved />;
  }

  return (
    <section>
      <SupportHeader data={support} setSupport={setSupport as Updater<Support>} />
      <SupportChat data={support} />
    </section>
  );
}

export default SupportPage;
