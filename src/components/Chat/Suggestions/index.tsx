'use client';

import { Container } from './Suggestions.styled';
import { useChatContext } from '@/hooks';

const suggestions = [
  'Quais cursos o IESB oferece?',
  'Como entro em contato com a secretaria?',
  'Qual o endereço do Campus Sul?',
];

function Suggestions() {
  const { getStream } = useChatContext();

  return (
    <Container>
      {suggestions.map((suggestion, index) => (
        <span
          key={index}
          onClick={() => getStream(suggestion)}
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
