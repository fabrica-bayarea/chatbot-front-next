'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import Feedback from './Feedback';
import Suggestions from './Suggestions';
import { IconButton, Form, ChatInput, ChatMessage } from './styled';
import { useChatContext, useMainContext } from '@/hooks';
import { mediaQueries } from '@/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
`;

const Conversation = styled.div<{ $redirected: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 30px;
  overflow-y: scroll;
  padding: 40px 20px 0 40px;

  & > .redirect-status {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    gap: 20px;
    padding: 0 40px;
    text-align: center;

    & > p {
      font-style: italic;
    }

    & > span {
      font-weight: bold;
    }
  }

  & > *:not(.redirect-status) {
    opacity: ${({ $redirected }) => ($redirected ? '0.8' : '1')};
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }

  ${mediaQueries.mobileL} {
    padding: 40px 10px 0;
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

  ${mediaQueries.mobileL} {
    right: 10px;
  }
`;

function Chat() {
  const { user } = useMainContext();
  const { conversation, conversationLength, getReply, isRedirected } = useChatContext();
  const { isLoading } = useMainContext();
  const loadingRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Request an AI response to update the conversation
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const inputElement = inputRef.current as HTMLInputElement;
    const content = inputElement.value;

    if (!content || isLoading || isRedirected) {
      return;
    }

    inputElement.value = '';
    await getReply({ content });
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
      <Conversation $redirected={isRedirected}>
        <ChatMessage $role="assistant">
          Eu sou <strong>Eda</strong>, assistente virtual.
          <br />
          Selecione uma das perguntas frequentes abaixo ou faça uma você mesmo! Estou aqui
          para ajudar da melhor forma possível!
        </ChatMessage>
        {conversation.messages.map((message, index) => (
          <ChatMessage key={index} $role={message.role}>
            {message.content}
          </ChatMessage>
        ))}
        {conversationLength === 0 && <Suggestions />}
        {showFeedback && <Feedback scrollFn={scrollToBottom} />}
        {isRedirected && (
          <div className="redirect-status">
            <p>
              Esta conversa foi direcionada para nosso setor de suporte e assim que
              possível uma resposta será enviada para o e-mail:
            </p>
            <span>{user?.email}</span>
          </div>
        )}
        <Loading ref={loadingRef}>
          {isLoading && <BeatLoader color="lightgray" size={8} />}
        </Loading>
      </Conversation>
      {!isRedirected && (
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
