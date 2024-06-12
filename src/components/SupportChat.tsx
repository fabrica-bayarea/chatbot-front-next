'use client';

import Image from 'next/image';
import { type FormEvent, useRef } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import ChatMessage from './ChatMessage';
import LineBreaks from './LineBreaks';
import { IconButton, Form, ChatTextArea } from './styled';
import { useMainContext, useMessages } from '@/hooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px);
  padding: 0 20% 40px;
`;

const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 40px;
  padding: 60px 40px 0 20px;
  overflow-y: scroll;

  & > hr {
    background-color: var(--clr-light);
    background-image: linear-gradient(to right, white, transparent, white);
    border: none;
    min-height: 2px;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }
`;

const Loading = styled.div`
  align-items: center;
  display: flex;
  min-height: 40px;
`;

const SendButton = styled(IconButton)`
  background-color: var(--clr-d);
  bottom: 30px;
  height: 60px;
  position: absolute;
  right: -80px;
`;

function SupportChat({ data }) {
  const { user } = useMainContext();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const { isLoading, messages, addNewMessage } = useMessages(data.messages);

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

  // Main render
  return (
    <Container>
      <Conversation>
        {messages.map(({ content, role, user_profile }, index) => {

          return (
            <ChatMessage
              key={index}
              role={role}
              user_profile={user_profile}
            >
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
