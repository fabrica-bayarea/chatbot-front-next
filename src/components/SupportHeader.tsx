'use client';

import styled from 'styled-components';

import RequestButton from './RequestButton';
import { Avatar } from './styled';
import { sendSupport, updateStatus } from '@/app/actions';
import { useState } from 'react';
import { useMainContext } from '@/hooks';

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

function SupportHeader({ data, setSupport }) {
  const { setAndShow } = useMainContext();
  const [lastEmail, setLastEmail] = useState(data.last_email);
  const user = data.user_profile;

  const handleAccept = async () => {
    await updateStatus({ table: 'support', id: data.id, status: 'accepted' });
    setSupport((draft) => {
      draft.status = 'accepted';
    });
    setAndShow('Atendimento iniciado!');
  };

  const handleEmail = async () => {
    const time = await sendSupport(data.id);
    setLastEmail(time);
    setAndShow('E-mail enviado!');
  };

  const handleClose = async () => {
    await updateStatus({ table: 'support', id: data.id, status: 'closed' });
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
            {lastEmail && (
              <span>{`Último envio: ${new Date(lastEmail).toLocaleString(
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
