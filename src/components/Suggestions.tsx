'use client';

import styled from 'styled-components';

import { Suggestion } from './styled';
import { useChatContext } from '@/hooks';

const suggestions = [
  'Quais cursos o IESB oferece?',
  'Como entro em contato com a secretaria?',
  'Qual o endereço do Campus Sul?',
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function Suggestions() {
  const { getAnswer } = useChatContext();

  return (
    <Container>
      {suggestions.map((suggestion, index) => (
        <Suggestion
          key={index}
          onClick={() => getAnswer(suggestion)}
          role="button"
          tabIndex={0}
          $right={true}
          $bgColor="var(--clr-light)"
        >
          {suggestion}
        </Suggestion>
      ))}
    </Container>
  );
}

export default Suggestions;
