import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import Feedback from './Feedback';
import { IconButton, Form, ChatInput, ChatMessage } from './styled';
import { useChatContext, useMainContext } from '@/hooks';
import { devices } from '@/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
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

  @media ${devices.mobileL} {
    padding: 40px 10px 0;
  }
`;

const Suggestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SendButton = styled(IconButton)`
  bottom: 20px;
  height: 60px;
  position: absolute;
  right: -30px;

  @media ${devices.mobileL} {
    right: 10px;
  }
`;

function Chat() {
  const { messages, getReply } = useChatContext();
  const { isLoading } = useMainContext();
  const controlRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [error, setError] = useState(false);

  // Request a response to update the conversation
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const inputElement = inputRef.current as HTMLInputElement;
    const content = inputElement.value;

    if (!content || isLoading) {
      return;
    }

    inputElement.value = '';
    setError(false);
    const [success] = await getReply({ content });

    if (!success) {
      setError(true);
    }
  };

  // Ensure that the control element is visible
  const scrollToBottom = () => {
    const controlElement = controlRef.current as HTMLDivElement;
    controlElement.scrollIntoView();
  };

  // Render functions
  const renderMessages = () => {
    return messages.map((message, index) => (
      <ChatMessage key={index} $role={message.role}>
        {message.content}
      </ChatMessage>
    ));
  };

  const renderSuggestions = () => {
    const suggestions = [
      'Quais as cores da bandeira do Brasil?',
      'Como trocar uma lâmpada?',
      'Conte uma história emocionante!',
    ];

    return (
      <Suggestions>
        {suggestions.map((suggestion, index) => (
          <ChatMessage
            key={index}
            onClick={() => getReply({ content: suggestion })}
            role="button"
            tabIndex={0}
            $role="suggestion"
          >
            {suggestion}
          </ChatMessage>
        ))}
      </Suggestions>
    );
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
        <ChatMessage $role="assistant">
          Eu sou <strong>Eda</strong>, assistente virtual.
          <br />
          Selecione uma das perguntas frequentes abaixo ou faça uma você mesmo! Estou aqui
          para ajudar da melhor forma possível!
        </ChatMessage>
        {renderMessages()}
        {messages.length === 0 && renderSuggestions()}
        {error && <ChatMessage $role="error">Ooops... algo deu errado.</ChatMessage>}
        {!isLoading && messages.length !== 0 && (
          <Feedback scrollFn={scrollToBottom} />
        )}
        <div ref={controlRef}>
          {isLoading && <BeatLoader color="lightgray" size={8} />}
        </div>
      </Conversation>
      <Form onSubmit={handleSubmit}>
        <ChatInput type="text" ref={inputRef} placeholder="Digite uma mensagem..." />
        <SendButton type="submit" $bg="color">
          <Image src="paper_plane-white.svg" height={24} width={24} alt="Send icon" />
        </SendButton>
      </Form>
    </Container>
  );
}

export default Chat;
