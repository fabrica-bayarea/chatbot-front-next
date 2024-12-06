'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { type Updater } from 'use-immer';

import Loading from './loading';
import { fetchConversationBySupportId } from '@/actions/conversations';
import { SupportChat, SupportHeader } from '@/components/Support';
import { useConversation } from '@/hooks';
import type { Conversation, Support } from '@/utils/definitions';
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
  const { conversation, setConversation } = useConversation(() =>
    fetchConversationBySupportId(params.id)
  );

  if (conversation === undefined) {
    return <Loading />;
  }

  if (conversation === null) {
    return <Moved />;
  }

  return (
    <section>
      <SupportHeader
        conversation={conversation}
        setConversation={setConversation as Updater<Conversation>}
      />
      <SupportChat conversation={conversation} />
    </section>
  );
}

export default SupportPage;
