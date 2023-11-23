'use client';

import styled from 'styled-components';

import { Avatar, AltButton } from './styled';
import type { SupportHeaderProps } from '@/types';

const Container = styled.header`
  align-items: center;
  border-bottom: 1px solid var(--clr-a);
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
  display: flex;
  gap: 20px;
  height: 120px;
  padding: 0 120px;

  & > div:nth-child(3) {
    display: flex;
    gap: 20px;
  }

  & > div:nth-child(2) {
    flex-grow: 10;

    & > div {
      font-size: 1.25rem;
    }
  }
`;

function SupportHeader({ conversation }: SupportHeaderProps) {
  return (
    <Container>
      <Avatar>{conversation.user.name.charAt(0)}</Avatar>
      <div>
        <h1>{conversation.user.name}</h1>
        <div>{conversation.user.email}</div>
      </div>
      <div>
        <AltButton type="button">Enviar por e-mail</AltButton>
        <AltButton type="button">Encerrar atendimento</AltButton>
      </div>
    </Container>
  );
}

export default SupportHeader;
