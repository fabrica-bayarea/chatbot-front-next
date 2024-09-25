'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Updater } from 'use-immer';

import { Container, MoreButton, Options, UserContainer } from './SupportHeader.styled';

import {
  sendEndOfSupport,
  sendSupportUpdate,
  updateSupportStatus,
} from '@/actions/support';

import { RequestButton } from '@/components/Buttons';
import { Avatar } from '@/components/styled';
import { useMainContext, useOutsideClick } from '@/hooks';
import type { Support } from '@/utils/definitions';

function SupportHeader({
  data,
  setSupport,
}: {
  data: Support;
  setSupport: Updater<Support>;
}) {
  const { setAndShow } = useMainContext();
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const user = data.owner_profile;

  useOutsideClick(navRef, () => setIsVisible(false));

  const handleAccept = async () => {
    await updateSupportStatus(data.id, 'accepted');

    setSupport((draft) => {
      draft.status = 'accepted';
    });

    setIsVisible(false);
    setAndShow('Atendimento iniciado!');
  };

  const handleEmail = async () => {
    await sendSupportUpdate(data.id);
    setIsVisible(false);
    setAndShow('E-mail enviado!');
  };

  const handleClose = async () => {
    await updateSupportStatus(data.id, 'closed');
    await sendEndOfSupport(data.id);

    setSupport((draft) => {
      draft.status = 'closed';
    });

    setIsVisible(false);
    setAndShow('Atendimento encerrado!');
  };

  return (
    <Container>
      <Avatar $border={true} $fontSize="2em" $picture={user?.picture} $width="3em">
        {user?.name.charAt(0)}
      </Avatar>
      <UserContainer>
        <span>{user?.name}</span>
        <span>{user?.email}</span>
      </UserContainer>
      <Options ref={navRef} $isVisible={isVisible}>
        <MoreButton onMouseDown={() => setIsVisible(!isVisible)}>
          <Image
            src="/more_vert-white.svg"
            height={24}
            width={24}
            alt="Alternar visibilidade"
          />
        </MoreButton>
        <nav>
          {data.status === 'open' && (
            <RequestButton request={handleAccept}>Iniciar atendimento</RequestButton>
          )}
          {data.status !== 'open' && (
            <>
              <RequestButton request={handleEmail}>Enviar por e-mail</RequestButton>
              {data.last_sent_at && (
                <span>{`Último envio: ${new Date(data.last_sent_at).toLocaleString(
                  'pt-BR'
                )}`}</span>
              )}
            </>
          )}
          {data.status === 'accepted' && (
            <RequestButton request={handleClose}>Encerrar atendimento</RequestButton>
          )}
        </nav>
      </Options>
    </Container>
  );
}

export default SupportHeader;
