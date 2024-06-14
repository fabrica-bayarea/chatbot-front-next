'use client';

import Link from 'next/link';

import SupportChat from '@/components/SupportChat';
import SupportHeader from '@/components/SupportHeader';
import { useSupport } from '@/hooks';
import type { SupportProps } from '@/lib/definitions';


function Support({ params }: SupportProps) {
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
      <SupportHeader data={support} setSupport={setSupport} />
      <SupportChat data={support} />
    </section>
  );
}

export default Support;
