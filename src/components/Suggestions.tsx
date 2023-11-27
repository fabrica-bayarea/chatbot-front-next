'use client';

import styled from 'styled-components';

import { ChatMessage } from './styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function Suggestions({ handleReply }: { handleReply: (content: string) => void }) {
  const suggestions = [
    'Quais as cores da bandeira do Brasil?',
    'Como trocar uma lâmpada?',
    'Conte uma história emocionante!',
  ];

  return (
    <Container>
      {suggestions.map((suggestion, index) => (
        <ChatMessage
          key={index}
          onClick={() => handleReply(suggestion)}
          role="button"
          tabIndex={0}
          $role="suggestion"
        >
          {suggestion}
        </ChatMessage>
      ))}
    </Container>
  );
}

export default Suggestions;
