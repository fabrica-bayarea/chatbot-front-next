import styled, { css } from 'styled-components';

import { Avatar } from './styled';
import { useMainContext } from '@/hooks';
import type { MessageRole, Profile } from '@/utils/definitions';
import { ReactNode } from 'react';

const Container = styled.div<{ $alignment?: 'start' | 'end' }>`
  display: flex;
  flex-direction: column;
  position: relative;

  & > div:first-of-type {
    left: -20px;
    position: absolute;
    top: -20px;

    ${({ $alignment }) =>
      $alignment === 'end' &&
      css`
        left: unset;
        right: -20px;
      `}
  }
`;

export const Message = styled.span<{
  $alignment?: 'start' | 'end';
  $bgColor?: string;
}>`
  --r: 12px;
  --radius: 0 var(--r) var(--r) 0;
  --radius-inverted: var(--r) 0 0 var(--r);

  align-self: flex-start;
  background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : 'var(--clr-a)')};
  border-radius: var(--radius);
  line-height: 1.25rem;
  margin: 0 20px 0 0;
  padding: 18px;

  ${({ $alignment }) =>
    $alignment === 'end' &&
    css`
      align-self: flex-end;
      border-radius: var(--radius-inverted);
      margin: 0 0 0 20px;
    `}
`;

function ChatMessage({
  children,
  role,
  ownerProfile,
}: {
  children: ReactNode;
  role: MessageRole;
  ownerProfile?: Profile | null;
}) {
  const { user } = useMainContext();

  const alignment = ownerProfile?.id === user?.id ? 'end' : 'start';
  const picture = ownerProfile?.picture;
  const name = ownerProfile ? ownerProfile.name : 'Eda';
  const bgColor = role === 'user' ? 'var(--clr-lighter-gray)' : 'var(--clr-a)';

  return (
    <Container $alignment={alignment}>
      <Avatar $border={true} $fontSize="0.9rem" $picture={picture} $width="36px">
        {name?.charAt(0)}
      </Avatar>
      <Message $alignment={alignment} $bgColor={bgColor}>
        {children}
      </Message>
    </Container>
  );
}

export default ChatMessage;
