'use client';

import type { Updater } from 'use-immer';

import { ButtonContainer, Container, UserContainer } from './SupportHeader.styled';
import { sendSupport, updateSupportStatus } from '@/actions/support';
import { RequestButton } from '@/components/Buttons';
import { Avatar } from '@/components/styled';
import { useMainContext } from '@/hooks';
import type { Support } from '@/utils/definitions';

function SupportHeader({
  data,
  setSupport,
}: {
  data: Support;
  setSupport: Updater<Support>;
}) {
  const { setAndShow } = useMainContext();
  const user = data.owner_profile;

  const handleAccept = async () => {
    await updateSupportStatus(data.id, 'accepted');

    setSupport((draft) => {
      draft.status = 'accepted';
    });

    setAndShow('Atendimento iniciado!');
  };

  const handleEmail = async () => {
    const response = await sendSupport(data.id);

    if (response === 'ok') {
      setAndShow('E-mail enviado!');
    }
  };

  const handleClose = async () => {
    await updateSupportStatus(data.id, 'closed');
    setSupport((draft) => {
      draft.status = 'closed';
    });
    setAndShow('Atendimento encerrado!');
  };

  return (
    <Container>
      <Avatar $border={true} $fontSize="2rem" $picture={user?.picture} $width="100px">
        {user?.name.charAt(0)}
      </Avatar>
      <UserContainer>
        <span>{user?.name}</span>
        <span>{user?.email}</span>
      </UserContainer>
      <ButtonContainer>
        {data.status === 'open' && (
          <RequestButton disabled={false} request={handleAccept}>
            Iniciar atendimento
          </RequestButton>
        )}
        {data.status === 'accepted' && (
          <>
            <RequestButton request={handleEmail}>Enviar por e-mail</RequestButton>
            <RequestButton request={handleClose}>Encerrar atendimento</RequestButton>
            {data.last_sent_at && (
              <span>{`Último envio: ${new Date(data.last_sent_at).toLocaleString(
                'pt-BR'
              )}`}</span>
            )}
          </>
        )}
      </ButtonContainer>
    </Container>
  );
}

export default SupportHeader;
