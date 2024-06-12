'use client';

import styled from 'styled-components';

import RequestButton from './RequestButton';
import { Avatar } from './styled';
import { sendSupport, updateStatus } from '@/app/actions';
import { useState } from 'react';

const Container = styled.header`
  align-items: center;
  border-bottom: 1px solid var(--clr-a);
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
  display: flex;
  gap: 20px;
  height: 140px;
  padding: 0 120px;

  & > div:nth-child(2) {
    flex-grow: 10;

    & > div {
      font-size: 1.25rem;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  position: relative;

  & > span {
    bottom: -25px;
    font-size: 0.75rem;
    position: absolute;
  }
`;

function SupportHeader({ data }) {
  const [lastEmail, setLastEmail] = useState(data.last_email);
  const user = data.user_profile;

  const handleEmail = async () => {
    const time = await sendSupport(data.id);
    setLastEmail(time);
  };

  return (
    <Container>
      <Avatar $fontSize="2rem" $picture={user?.picture} $width="100px">
        {user?.name.charAt(0)}
      </Avatar>
      <div>
        <h1>{user?.name}</h1>
        <div>{user?.email}</div>
      </div>
      <ButtonContainer>
        {data.status === 'open' && (
          <RequestButton
            disabled={false}
            request={() =>
              updateStatus({ table: 'support', id: data.id, status: 'accepted' })
            }
          >
            Iniciar atendimento
          </RequestButton>
        )}
        {data.status === 'accepted' && (
          <>
            <RequestButton disabled={data.messages.length === 0} request={handleEmail}>
              Enviar por e-mail
            </RequestButton>
            <RequestButton
              disabled={data.messages.length === 0}
              request={() =>
                updateStatus({ table: 'support', id: data.id, status: 'closed' })
              }
            >
              Encerrar atendimento
            </RequestButton>
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
