'use client';

import { useEffect, useRef } from 'react';

import { Container, Conversation as StyledConversation } from './SupportChat.styled';
import ChatMessage from '@/components/ChatMessage';
import { ChatForm } from '@/components/Forms';
import { useMessages } from '@/hooks';
import type { Conversation, Support } from '@/utils/definitions';

function SupportChat({ conversation }: { conversation: Conversation }) {
  const { messages, sendMessage } = useMessages(conversation);
  const conversationRef = useRef<HTMLDivElement | null>(null);

  const support = conversation.support_details as Support;

  // Keeps the chat always scrolled down
  useEffect(() => {
    const conversationElement = conversationRef.current as HTMLDivElement;

    const ro = new ResizeObserver(() => {
      conversationElement.scrollTop = conversationElement.scrollHeight;
    });

    ro.observe(conversationElement);
  });

  return (
    <Container>
      <StyledConversation ref={conversationRef}>
        {messages.map(({ content, role, owner_profile }, index) => {
          return (
            <ChatMessage key={index} role={role} ownerProfile={owner_profile}>
              {content}
            </ChatMessage>
          );
        })}
      </StyledConversation>
      <ChatForm
        action={(content) => sendMessage(content, 'collaborator')}
        background={true}
        maxHeight={200}
        disabled={support.status !== 'accepted'}
      />
    </Container>
  );
}

export default SupportChat;
