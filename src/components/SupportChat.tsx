'use client';

import Image from 'next/image';
import { FormEvent, useRef } from 'react';
import styled from 'styled-components';

import { IconButton, Form, ChatTextArea, ChatMessage, InfoMessage } from './styled';
import { useChatContext } from '@/hooks';
import type { ConversationMessage } from '@/lib/definitions';

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

function AssistantConversation({ messages }: { messages: ConversationMessage[] }) {
  return (
    <>
      <InfoMessage>Início do atendimento virtual</InfoMessage>
      {messages.map((message, index) => (
        <ChatMessage key={index} $role={message.role}>
          {message.content}
        </ChatMessage>
      ))}
      <InfoMessage>Fim do atendimento virtual</InfoMessage>
    </>
  );
}

function SupportChat() {
  const { conversation } = useChatContext();
  const controlRef = useRef<null | HTMLDivElement>(null);

  //
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
  };

  // Main render
  return (
    <Container>
      <Conversation>
        <AssistantConversation messages={conversation.messages} />
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
