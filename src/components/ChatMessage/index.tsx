'use client';

import type { ReactNode } from 'react';

import { Container, Message } from './ChatMessage.styled';
import { Avatar } from '@/components/styled';
import { useMainContext } from '@/hooks';
import type { MessageRole, Profile } from '@/utils/definitions';

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
