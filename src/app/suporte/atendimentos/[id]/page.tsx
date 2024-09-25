'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { type Updater } from 'use-immer';

import Loading from './loading';
import { SupportChat, SupportHeader } from '@/components/Support';
import { useSupport } from '@/hooks';
import type { Support } from '@/utils/definitions';
import { mediaQueries } from '@/utils/mediaQueries';

const MovedContainer = styled.section`
  align-items: center;
  background: linear-gradient(to bottom, white 80%, var(--clr-a) 120%);
  gap: 40px;
  justify-content: center;
  padding: 0 20px;

  & > span:first-child {
    font-size: 1.5rem;
    text-align: center;
  }

  & > span:nth-child(2) {
    color: var(--clr-a);
    font-size: 5rem;
  }

  ${mediaQueries.mobileL} {
    & > span:first-child {
      font-size: 1.2rem;
      text-align: center;
    }

    & > span:nth-child(2) {
      font-size: 2.5rem;
    }
  }
`;

function Moved() {
  return (
    <MovedContainer>
      <span>Esta conversa não existe ou foi movida.</span>
      <span>(｡•́︿•̀｡)</span>
      <Link href={'/suporte'}>Página inicial</Link>
    </MovedContainer>
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
