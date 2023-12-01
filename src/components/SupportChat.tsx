'use client';

import Image from 'next/image';
import { FormEvent, Fragment, useEffect, useRef } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import LineBreaks from './LineBreaks';
import { IconButton, Form, ChatTextArea, InfoMessage, ChatMessage } from './styled';
import { useChatContext, useMainContext } from '@/hooks';
import { ConversationMessage } from '@/lib/definitions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  padding: 0 0 40px;
`;

const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 30px;
  overflow-y: scroll;
  padding: 0 240px;

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

function SupportChat() {
  const { conversation, sendReply, supportLength } = useChatContext();
  const { isLoading } = useMainContext();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const isAccepted = conversation.status === 'accepted';

  // Registers a message to be sent to the user
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const inputElement = inputRef.current as HTMLTextAreaElement;
    const content = inputElement.value;

    if (!content || isLoading) {
      return;
    }

    inputElement.value = '';
    await sendReply(content);
  };

  // Ensure that the control element is visible
  const scrollToBottom = () => {
    const controlElement = loadingRef.current as HTMLDivElement;
    controlElement.scrollIntoView();
  };

  // Keeps the chat always scrolled down
  useEffect(() => {
    if (supportLength !== 0) {
      scrollToBottom();
    }
  }, [supportLength]);

  // Main render
  return (
    <Container>
      <Conversation>
        <InfoMessage $bgColor="var(--clr-blue)">
          Início do atendimento virtual
        </InfoMessage>
        {conversation.messages.map(({ content, role }, index) => (
          <ChatMessage key={index} $inverted={true} $role={role}>
            <LineBreaks content={content} />
          </ChatMessage>
        ))}
        <InfoMessage $bgColor="var(--clr-blue)">Fim do atendimento virtual</InfoMessage>
        {isAccepted && (
          <Fragment>
            <hr />
            <InfoMessage>Início do atendimento humano</InfoMessage>
          </Fragment>
        )}
        {(conversation.support?.messages ?? []).map(({ content, role }, index) => (
          <ChatMessage key={index} $inverted={true} $role={role}>
            <LineBreaks content={content} />
          </ChatMessage>
        ))}
        <Loading ref={loadingRef}>
          {isLoading && <BeatLoader color="lightgray" size={8} />}
        </Loading>
      </Conversation>
      {isAccepted && (
        <Form onSubmit={handleSubmit} $padding="0 240px">
          <ChatTextArea ref={inputRef} placeholder="Digite uma mensagem..." />
          <IconButton type="submit" $bgColor="var(--clr-d)" $width="60px">
            <Image src="/paper_plane-white.svg" height={24} width={24} alt="Send icon" />
          </IconButton>
        </Form>
      )}
    </Container>
  );
}

export default SupportChat;
