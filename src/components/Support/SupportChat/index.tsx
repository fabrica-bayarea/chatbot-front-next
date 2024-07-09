'use client';

import { useEffect, useRef } from 'react';

import { Container, Conversation } from './SupportChat.styled';
import ChatMessage from '@/components/ChatMessage';
import { ChatForm } from '@/components/Forms';
import { useMessages } from '@/hooks';
import type { Support } from '@/utils/definitions';

function SupportChat({ data }: { data: Support }) {
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const { messages, addNewMessage } = useMessages(data);

  const isAccepted = data.status === 'accepted';

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
      <Conversation ref={conversationRef}>
        {messages.map(({ content, role, owner_profile }, index) => {
          return (
            <ChatMessage key={index} role={role} ownerProfile={owner_profile}>
              {content}
            </ChatMessage>
          );
        })}
      </Conversation>
      {isAccepted && (
        <ChatForm
          action={(content) => addNewMessage(content)}
          background={true}
          maxHeight={200}
        />
      )}
    </Container>
  );
}

export default SupportChat;
