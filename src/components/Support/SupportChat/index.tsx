'use client';

import Image from 'next/image';
import { type FormEvent, useEffect, useRef } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import {
  ChatForm,
  Container,
  Conversation,
  Loading,
  SendButton,
} from './SupportChat.styled';

import ChatMessage from '@/components/ChatMessage';
import { ChatTextArea } from '@/components/styled';
import { useMessages } from '@/hooks';
import type { Support } from '@/utils/definitions';

function SupportChat({ data }: { data: Support }) {
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { isLoading, messages, addNewMessage } = useMessages(data);

  const isAccepted = data.status === 'accepted';

  // Registers a message to be sent to the user
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const inputElement = inputRef.current as HTMLTextAreaElement;
    const content = inputElement.value;

    if (!content || isLoading) {
      return;
    }

    inputElement.value = '';
    await addNewMessage(content);
  };

  // Keeps the chat always scrolled down
  useEffect(() => {
    const conversationElement = conversationRef.current as HTMLDivElement;

    const ro = new ResizeObserver(() => {
      conversationElement.scrollTop = conversationElement.scrollHeight;
    });

    ro.observe(conversationElement);
  });

  // Main render
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
        <Loading>{isLoading && <BeatLoader color="gray" size={12} />}</Loading>
      </Conversation>
      {isAccepted && (
        <ChatForm onSubmit={handleSubmit}>
          <div>
            <ChatTextArea ref={inputRef} placeholder="Digite uma mensagem..." />
            <SendButton type="submit">
              <Image src="/send-white.svg" height={24} width={24} alt="Send icon" />
            </SendButton>
          </div>
        </ChatForm>
      )}
    </Container>
  );
}

export default SupportChat;
