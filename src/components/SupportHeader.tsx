'use client';

import styled from 'styled-components';
import type { Updater } from 'use-immer';

import { Avatar } from './styled';
import RequestButton from './RequestButton';
import { sendSupport, updateSupportStatus } from '@/actions/support';
import { useMainContext } from '@/hooks';
import { Support } from '@/utils/definitions';

const Container = styled.header`
  align-items: center;
  background-color: var(--clr-b);
  background-image: linear-gradient(
    to bottom right,
    rgba(255 255 255 / 10%),
    rgba(255 255 255 / 0%) 50%
  );
  border-bottom: 1px solid var(--clr-a);
  color: var(--clr-light);
  display: flex;
  gap: 20px;
  height: 150px;
  padding: 0 120px;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 10px;

  & > span:first-child {
    font-size: 2rem;
    left: -2px;
    position: relative;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  position: relative;

  & > span {
    bottom: -25px;
    font-size: 0.75rem;
    left: 25px;
    position: absolute;
  }
`;

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
