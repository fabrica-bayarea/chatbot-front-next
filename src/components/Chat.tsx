'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import ChatMessage from './ChatMessage';
import Feedback from './Feedback';
import Suggestions from './Suggestions';
import { IconButton, Form, ChatInput } from './styled';
import { useChatContext, useMainContext } from '@/hooks';
import LineBreaks from './LineBreaks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
`;

const Conversation = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 40px;
  overflow-y: scroll;
  padding: 40px 34px 0 40px;

  & > .redirect-status {
    font-size: 0.8rem;
    margin: 40px 40px 0;
    text-align: center;

    & > p {
      font-style: italic;
      margin-bottom: 20px;
    }

    & > span {
      font-size: 0.9rem;
      font-weight: bold;
    }
  }

  & > *:not(.redirect-status) {
    opacity: ${({ $open }) => ($open ? '1' : '0.6')};
  }

  &::-webkit-scrollbar {
    width: 6px;
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
  bottom: 20px;
  height: 60px;
  position: absolute;
  right: -30px;
`;

function Chat() {
  const { user } = useMainContext();
  const { conversation, conversationLength, getReply } = useChatContext();
  const { isLoading } = useMainContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const isOpen = conversation.status === 'open';

  // Request an AI response to update the conversation
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const inputElement = inputRef.current as HTMLInputElement;
    const content = inputElement.value;

    if (!content || isLoading) {
      return;
    }

    inputElement.value = '';
    await getReply(content);
  };

  // Ensure that the control element is visible
  const scrollToBottom = () => {
    const controlElement = loadingRef.current as HTMLDivElement;
    controlElement.scrollIntoView();
  };

  // Keeps the chat always scrolled down
  useEffect(() => {
    if (conversationLength !== 0) {
      scrollToBottom();
    }
  }, [conversationLength]);

  // Shows feedback if the conversation is open and the last message is from the assistant
  useEffect(() => {
    setShowFeedback(
      conversation.status === 'open' &&
        conversationLength % 2 === 0 &&
        conversationLength !== 0
    );
  }, [conversation.status, conversationLength]);

  return (
    <Container>
      <Conversation $open={isOpen}>
        <ChatMessage name="Eda">
          Eu sou <strong>Eda</strong>, assistente virtual.
          <br />
          Selecione uma das perguntas frequentes abaixo ou faça uma você mesmo! Estou aqui
          para ajudar da melhor forma possível!
        </ChatMessage>
        {conversation.messages.map(({ content, role }, index) => (
          <ChatMessage
            key={index}
            bgColor={role === 'assistant' ? 'var(--clr-a)' : 'var(--clr-lighter-gray)'}
            imageUrl={role === 'assistant' ? '' : user?.imageUrl}
            name={role === 'assistant' ? 'Eda' : user?.name}
            right={role === 'user'}
          >
            <LineBreaks content={content} />
          </ChatMessage>
        ))}
        {conversationLength === 0 && <Suggestions />}
        {showFeedback && <Feedback scrollFn={scrollToBottom} />}
        {!isOpen && (
          <div className="redirect-status">
            <p>
              Esta conversa foi direcionada para o nosso setor de suporte e assim que
              possível uma resposta será enviada para o e-mail:
            </p>
            <span>{user?.email}</span>
          </div>
        )}
        <Loading ref={loadingRef}>
          {isLoading && <BeatLoader color="lightgray" size={8} />}
        </Loading>
      </Conversation>
      {isOpen && (
        <Form onSubmit={handleSubmit}>
          <ChatInput type="text" ref={inputRef} placeholder="Digite uma mensagem..." />
          <SendButton type="submit" $bgColor="var(--clr-d)">
            <Image src="/paper_plane-white.svg" height={24} width={24} alt="Send icon" />
          </SendButton>
        </Form>
      )}
    </Container>
  );
}

export default Chat;
