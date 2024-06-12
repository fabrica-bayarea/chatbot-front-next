import Link from 'next/link';

import { fetchSupportById } from '@/app/actions';
import SupportChat from '@/components/SupportChat';
import SupportHeader from '@/components/SupportHeader';
import type { SupportProps } from '@/lib/definitions';

import styles from '../support.module.css';

async function Support({ params }: SupportProps) {
  const { data } = await fetchSupportById(params.id);

  if (!data) {
    return (
      <section className={styles.closed}>
        <span>Esta conversa não existe ou foi encerrada.</span>
        <Link href={'/suporte'}>Página inicial</Link>
      </section>
    );
  }

  return (
    <section>
      <SupportHeader data={data} />
      <SupportChat data={data} />
    </section>
  );
}

export default Support;
