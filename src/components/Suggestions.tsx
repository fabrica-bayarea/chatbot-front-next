'use client';

import styled from 'styled-components';

import { Suggestion } from './styled';
import { useChatContext } from '@/hooks';

const suggestions = [
  'Qual o telefone de atendimento?',
  'Qual o endereço do Campus Sul?',
  'Quais cursos o IESB oferece?',
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
