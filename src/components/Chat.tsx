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

const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 30px;
  overflow-y: scroll;
  padding: 40px 20px 0 40px;

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
  const { conversation, conversationLength, getReply } = useChatContext();
  const { isLoading } = useMainContext();
  const loadingRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [showError, setShowError] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Request an AI response to update the conversation
  const handleReply = async (content: string) => {
    setShowError(false);
    const [success] = await getReply({ content });

    if (!success) {
      setShowError(true);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const inputElement = inputRef.current as HTMLInputElement;
    const content = inputElement.value;

    if (!content || isLoading) {
      return;
    }

    inputElement.value = '';
    await handleReply(content);
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

  useEffect(() => {
    setShowFeedback(conversationLength % 2 === 0 && conversationLength !== 0);
  }, [conversationLength]);

  return (
    <Container>
      <Conversation>
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
        {conversationLength === 0 && <Suggestions handleReply={handleReply} />}
        {showError && <ChatMessage $role="error">Ooops... algo deu errado.</ChatMessage>}
        {showFeedback && <Feedback scrollFn={scrollToBottom} />}
        <Loading ref={loadingRef}>
          {isLoading && <BeatLoader color="lightgray" size={8} />}
        </Loading>
      </Conversation>
      <Form onSubmit={handleSubmit}>
        <ChatInput type="text" ref={inputRef} placeholder="Digite uma mensagem..." />
        <SendButton type="submit" $bgColor="var(--clr-d)">
          <Image src="/paper_plane-white.svg" height={24} width={24} alt="Send icon" />
        </SendButton>
      </Form>
    </Container>
  );
}

export default Chat;
