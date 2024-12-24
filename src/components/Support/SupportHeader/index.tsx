'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { type Updater } from 'use-immer';

import { ButtonContainer, Container, UserContainer } from './SupportHeader.styled';

import {
  sendEndOfSupport,
  sendSupportUpdate,
  updateSupportStatus,
} from '@/actions/support';

import { RequestButton } from '@/components/Buttons';
import { Avatar, Presence } from '@/components/styled';
import { useMainContext, useOutsideClick } from '@/hooks';
import type { Conversation, Support } from '@/utils/definitions';

function SupportHeader({
  conversation,
  setConversation,
}: {
  conversation: Conversation;
  setConversation: Updater<Conversation>;
}) {
  const { presence, setAndShow } = useMainContext();
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const support = conversation.support_details as Support;
  const owner = conversation.owner_profile;

  useOutsideClick(navRef, () => setIsVisible(false));

  const handleAccept = async () => {
    await updateSupportStatus(support.id, 'accepted');

    setConversation((draft) => {
      (draft.support_details as Support).status = 'accepted';
    });

    setIsVisible(false);
    setAndShow('Atendimento iniciado!');
  };

  const handleEmail = async () => {
    await sendSupportUpdate(conversation);
    setIsVisible(false);
    setAndShow('E-mail enviado!');
  };

  const handleClose = async () => {
    await updateSupportStatus(support.id, 'closed');
    await sendEndOfSupport(conversation);

    setConversation((draft) => {
      (draft.support_details as Support).status = 'closed';
    });

    setIsVisible(false);
    setAndShow('Atendimento encerrado!');
  };

  return (
    <Container>
      <Avatar $border={true} $fontSize="2em" $picture={owner.picture} $width="3em">
        {owner?.name.charAt(0)}
      </Avatar>
      <UserContainer>
        <div>
          <span>{owner.name}</span>
          <Presence $presence={presence.includes(owner.id)} />
        </div>
        <span>{owner.email}</span>
      </UserContainer>
      <ButtonContainer ref={navRef} $isVisible={isVisible}>
        <button onMouseDown={() => setIsVisible(!isVisible)}>
          <Image
            src="/more_vert-white.svg"
            height={24}
            width={24}
            alt="Alternar visibilidade"
          />
        </button>
        <nav>
          {support.status === 'open' && (
            <RequestButton request={handleAccept}>Iniciar atendimento</RequestButton>
          )}
          {support.status !== 'open' && (
            <>
              <RequestButton request={handleEmail}>Enviar por e-mail</RequestButton>
              {support.last_sent_at && (
                <span>{`Último envio: ${new Date(support.last_sent_at).toLocaleString(
                  'pt-BR'
                )}`}</span>
              )}
            </>
          )}
          {support.status === 'accepted' && (
            <RequestButton request={handleClose}>Encerrar atendimento</RequestButton>
          )}
        </nav>
      </ButtonContainer>
    </Container>
  );
}

export default SupportHeader;
