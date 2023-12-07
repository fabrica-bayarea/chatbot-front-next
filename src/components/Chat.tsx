'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import Feedback from './Feedback';
import LineBreaks from './LineBreaks';
import { useChatContext, useMainContext } from '@/hooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  position: relative;
`;

const Conversation = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 60px;
  overflow-y: scroll;
  padding: 40px 32px 0 40px;
  width: 100%;

  & > .redirectStatus {
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

  & > *:not(.redirectStatus) {
    opacity: ${({ $open }) => ($open ? '1' : '0.6')};
  }

  &::-webkit-scrollbar {
    width: 8px;
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

function Chat() {
  const { user } = useMainContext();
  const { conversation, conversationLength } = useChatContext();
  const { isLoading } = useMainContext();
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const [showFeedback, setShowFeedback] = useState(true);

  const isOpen = conversation.status === 'open';

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

  // Shows feedback if the conversation is open and the last message is from
  // the assistant.
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
        {showFeedback && <Feedback scrollFn={scrollToBottom} />}
        {!isOpen && (
          <div className="redirectStatus">
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
      {isOpen && <ChatForm />}
    </Container>
  );
}

export default Chat;
