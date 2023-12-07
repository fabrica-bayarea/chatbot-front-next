'use client';

import styled from 'styled-components';

import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import Styled from './styled';

const Container = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  height: 600px;
  position: relative;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    flex-grow: 10;
    gap: 10px;
    overflow-y: scroll;
    padding: 40px 32px 0 40px;
    width: 100%;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--clr-c);
    }
  }
`;

const Suggestion = styled(Styled.ChatMessage)`
  cursor: pointer;

  &:hover {
    background-color: var(--clr-light-gray);
  }
`;

function NewChat() {
  const suggestions = [
    'Quais as cores da bandeira do Brasil?',
    'Como trocar uma lâmpada?',
    'Conte uma história emocionante!',
  ];

  return (
    <Container>
      <div>
        <ChatMessage name="Eda">
          Eu sou <strong>Eda</strong>, assistente virtual.
          <br />
          Selecione uma das perguntas frequentes abaixo ou faça uma você mesmo! Estou aqui
          para ajudar da melhor forma possível!
        </ChatMessage>
        {suggestions.map((suggestion, index) => (
          <Suggestion
            key={index}
            onClick={() => {}}
            role="button"
            tabIndex={0}
            $right={true}
            $bgColor="var(--clr-light)"
          >
            {suggestion}
          </Suggestion>
        ))}
      </div>
      <ChatForm />
    </Container>
  );
}

export default NewChat;
