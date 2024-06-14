'use client';

import Image from 'next/image';
import { type FormEvent, useEffect, useRef } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import ChatMessage from './ChatMessage';
import LineBreaks from './LineBreaks';
import { IconButton, Form, ChatTextArea } from './styled';
import { useMessages } from '@/hooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px);

  & form {
    margin-bottom: 40px;
    padding: 0 320px;
  }
`;

const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 80px;
  padding: 40px 312px 0 320px;
  overflow-y: scroll;

  & > hr {
    background-color: var(--clr-light);
    background-image: linear-gradient(to right, white, transparent, white);
    border: none;
    min-height: 2px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-b);
  }
`;

const Loading = styled.div`
  align-items: center;
  display: flex;
  min-height: 40px;
  padding: 0 20%;
`;

const SendButton = styled(IconButton)`
  background-color: var(--clr-d);
  bottom: 30px;
  height: 60px;
  position: absolute;
  right: calc(20% - 80px);
`;

function SupportChat({ data }) {
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
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
        {messages.map(({ content, role, user_profile }, index) => {
          return (
            <ChatMessage key={index} role={role} user_profile={user_profile}>
              <LineBreaks content={content} />
            </ChatMessage>
          );
        })}
      </Conversation>
      <Loading ref={loadingRef}>
        {isLoading && <BeatLoader color="lightgray" size={8} />}
      </Loading>
      {isAccepted && (
        <Form onSubmit={handleSubmit}>
          <ChatTextArea ref={inputRef} placeholder="Digite uma mensagem..." />
          <SendButton type="submit">
            <Image src="/paper_plane-white.svg" height={24} width={24} alt="Send icon" />
          </SendButton>
        </Form>
      )}
    </Container>
  );
}

export default SupportChat;
