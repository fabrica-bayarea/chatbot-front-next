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
  padding-bottom: 40px;
  width: 100%;
`;

const Conversation = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 40px;
  overflow-y: scroll;
  padding: 30px 24px 0 40px;

  & > div:first-of-type {
    align-items: center;
    display: flex;
    position: relative;

    & > img {
      left: -20px;
      opacity: 0.9;
      position: relative;
      top: 30px;
      z-index: 10;
    }

    &::after {
      background-color: black;
      border-radius: 50%;
      bottom: -35px;
      content: '';
      filter: blur(3px);
      height: 15px;
      left: 0;
      opacity: 0.4;
      position: absolute;
      width: 56px;
    }
  }

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
  background-color: var(--clr-d);
  bottom: 20px;
  height: 60px;
  position: absolute;
  right: -30px;
`;

function Chat() {
  const { user } = useMainContext();
  const { conversation, getAnswer, isStreaming } = useChatContext();
  const { isLoading } = useMainContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const conversationLength = conversation.messages.length;
  const isOpen = conversation.status === 'open';

  // Request an AI response to update the conversation
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const inputElement = inputRef.current as HTMLInputElement;
    const question = inputElement.value;

    if (!question || isLoading) {
      return;
    }

    inputElement.value = '';
    await getAnswer(question);
  };

  // Keeps the chat always scrolled down
  useEffect(() => {
    const conversationElement = conversationRef.current as HTMLDivElement;

    const ro = new ResizeObserver(() => {
      conversationElement.scrollTop = conversationElement.scrollHeight;
    });

    ro.observe(conversationElement);
  });

  // Shows feedback if the conversation is open and the last message is from the assistant
  useEffect(() => {
    setShowFeedback(
      conversation.status === 'open' &&
        conversationLength % 2 === 0 &&
        conversationLength !== 0 &&
        !isStreaming
    );
  }, [conversation.status, conversationLength, isStreaming]);

  return (
    <Container>
      <Conversation $open={isOpen} ref={conversationRef}>
        <div>
          <Image src="/eda.png" height={160} width={96} alt="Ilustração da Eda" />
          <ChatMessage role={'assistant'}>
            Eu sou <strong>Eda</strong>, assistente virtual do IESB.
            <br />
            Em que posso ajudar?
          </ChatMessage>
        </div>
        {conversation.messages.map(({ content, role, owner_profile }, index) => {
          return (
            <ChatMessage key={index} role={role} ownerProfile={owner_profile}>
              <LineBreaks content={content} />
            </ChatMessage>
          );
        })}
        {conversationLength === 0 && <Suggestions />}
        {showFeedback && (
          <Feedback id={conversation.messages[conversationLength - 1]?.id as string} />
        )}
        {!isOpen && (
          <div className="redirect-status">
            <p>
              Esta conversa foi direcionada para nosso setor de suporte. Assim que
              possível uma resposta será enviada para o e-mail:
            </p>
            <span>{user?.email}</span>
          </div>
        )}
        <Loading>{isLoading && <BeatLoader color="lightgray" size={8} />}</Loading>
      </Conversation>
      {isOpen && (
        <Form onSubmit={handleSubmit}>
          <ChatInput type="text" ref={inputRef} placeholder="Digite uma mensagem..." />
          <SendButton type="submit">
            <Image src="/paper_plane-white.svg" height={24} width={24} alt="Send icon" />
          </SendButton>
        </Form>
      )}
    </Container>
  );
}

export default Chat;
