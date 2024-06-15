'use client';

import styled from 'styled-components';

import { useChatContext } from '@/hooks';

const suggestions = [
  'Quais cursos o IESB oferece?',
  'Como entro em contato com a secretaria?',
  'Qual o endereço do Campus Sul?',
];

const Container = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 10px;
  justify-content: flex-end;

  & > span {
    background-color: var(--clr-light);
    border-radius: 12px;
    padding: 16px;

    &:hover {
      background-color: var(--clr-a);
      cursor: pointer;
    }
  }
`;

function Suggestions() {
  const { getAnswer } = useChatContext();

  return (
    <Container>
      {suggestions.map((suggestion, index) => (
        <span
          key={index}
          onClick={() => getAnswer(suggestion)}
          role="button"
          tabIndex={0}
        >
          {suggestion}
        </span>
      ))}
    </Container>
  );
}

export default Suggestions;
