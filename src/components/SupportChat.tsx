'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { IconButton, Form, ChatTextArea, ChatMessage, InfoMessage } from './styled';
import type { ChatMessageType, SupportHeaderProps } from '@/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  padding: 2px 0 40px;
`;

const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 30px;
  overflow-y: scroll;
  padding: 0 240px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }
`;

function AssistantConversation({ messages }: { messages: ChatMessageType[] }) {
  return (
    <>
      {messages.map((message, index) => (
        <ChatMessage key={index} $role={message.role}>
          {message.content}
        </ChatMessage>
      ))}
    </>
  );
}

function SupportChat({ conversation }: SupportHeaderProps) {
  const messages = conversation.messages;
  const controlRef = useRef<null | HTMLDivElement>(null);

  //
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  // Ensure that the control element is visible
  const scrollToBottom = () => {
    const controlElement = controlRef.current as HTMLDivElement;
    controlElement.scrollIntoView();
  };

  // Keeps the chat always scrolled down
  useEffect(() => {
    if (messages.length !== 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Main render
  return (
    <Container>
      <Conversation>
        <InfoMessage>Início do atendimento virtual</InfoMessage>
        <AssistantConversation messages={messages} />
        <InfoMessage>Fim do atendimento virtual</InfoMessage>
        <div ref={controlRef}></div>
      </Conversation>
      <Form onSubmit={handleSubmit} $padding="0 240px">
        <ChatTextArea placeholder="Digite uma mensagem..." />
        <IconButton type="submit" $bgColor="var(--clr-d)" $width="60px">
          <Image src="/paper_plane-white.svg" height={24} width={24} alt="Send icon" />
        </IconButton>
      </Form>
    </Container>
  );
}

export default SupportChat;
