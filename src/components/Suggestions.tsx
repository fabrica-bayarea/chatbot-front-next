'use client';

import styled from 'styled-components';

import { Suggestion } from './styled';
import { useChatContext } from '@/hooks';

const suggestions = [
  'Quais as cores da bandeira do Brasil?',
  'Como trocar uma lâmpada?',
  'Conte uma história emocionante!',
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function Suggestions() {
  const { getReply } = useChatContext();

  return (
    <Container>
      {suggestions.map((suggestion, index) => (
        <Suggestion
          key={index}
          onClick={() => getReply(suggestion)}
          role="button"
          tabIndex={0}
          $right={true}
          $bgColor='var(--clr-light)'
        >
          {suggestion}
        </Suggestion>
      ))}
    </Container>
  );
}

export default Suggestions;
