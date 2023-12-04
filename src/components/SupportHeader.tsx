'use client';

import { Fragment } from 'react';
import styled from 'styled-components';

import RequestButton from './RequestButton';
import { Avatar } from './styled';
import { useChatContext } from '@/hooks';

const Container = styled.header`
  align-items: center;
  border-bottom: 1px solid var(--clr-a);
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
  display: flex;
  gap: 20px;
  height: 120px;
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

function SupportHeader() {
  const { acceptConversation, changeStatus, conversation, sendEmail, supportLength } =
    useChatContext();

  const lastSent = conversation.support?.lastSent as number;
  const lastSentString = new Date(lastSent).toLocaleString('pt-BR');

  return (
    <Container>
      <Avatar $fontSize="2rem" $imageUrl={conversation.user?.imageUrl} $width="80px">
        {conversation.user?.name.charAt(0)}
      </Avatar>
      <div>
        <h1>{conversation.user?.name}</h1>
        <div>{conversation.user?.email}</div>
      </div>
      <ButtonContainer>
        {conversation.status === 'redirected' && (
          <RequestButton disabled={false} request={acceptConversation}>
            Iniciar atendimento
          </RequestButton>
        )}
        {conversation.status === 'accepted' && (
          <Fragment>
            <RequestButton disabled={supportLength === 0} request={sendEmail}>
              Enviar por e-mail
            </RequestButton>
            <RequestButton
              disabled={supportLength === 0}
              request={async () => changeStatus('closed')}
            >
              Encerrar atendimento
            </RequestButton>
            {lastSent && <span>{`Último envio: ${lastSentString}`}</span>}
          </Fragment>
        )}
      </ButtonContainer>
    </Container>
  );
}

export default SupportHeader;
