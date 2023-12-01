import styled, { css } from 'styled-components';

type ChatMessageProps = {
  $inverted?: boolean;
  $role: 'assistant' | 'collaborator' | 'error' | 'suggestion' | 'user';
};

const ChatMessage = styled.span<ChatMessageProps>`
  --r: 8px;
  --radius: var(--r) var(--r) var(--r) 0;
  --radius-inverted: var(--r) var(--r) 0 var(--r);

  padding: 12px;
  width: fit-content;

  ${({ $inverted, $role }) =>
    $role === 'assistant' &&
    css`
      align-self: ${$inverted ? 'flex-end' : 'flex-start'};
      background-color: var(--clr-a);
      border-radius: var(${$inverted ? '--radius-inverted' : '--radius'});
    `}

  ${({ $role }) =>
    $role === 'collaborator' &&
    css`
      align-self: flex-end;
      background-color: var(--clr-a);
      border-radius: var(--r) var(--r) 0 var(--r);
    `}

  ${({ $role }) =>
    $role === 'error' &&
    css`
      align-self: center;
      background-color: var(--clr-c);
      border-radius: var(--r);
      color: var(--clr-light);
      padding: 8px;
    `}

  ${({ $role }) =>
    $role === 'suggestion' &&
    css`
      align-self: flex-end;
      background-color: var(--clr-lighter-gray);
      border-radius: var(--r) var(--r) 0 var(--r);
      cursor: pointer;

      &:hover {
        background-color: var(--clr-light-gray);
      }
    `}

  ${({ $inverted, $role }) =>
    $role === 'user' &&
    css`
      align-self: ${$inverted ? 'flex-start' : 'flex-end'};
      background-color: var(--clr-lighter-gray);
      border-radius: var(${$inverted ? '--radius' : '--radius-inverted'});
    `}
`;

const InfoMessage = styled.span<{ $bgColor?: string }>`
  align-self: center;
  background-color: ${({ $bgColor }) => $bgColor ?? 'var(--clr-dark-gray)'};
  border-radius: 4px;
  color: var(--clr-light);
  font-size: 0.75rem;
  margin: 40px 0;
  padding: 5px 10px;
  width: fit-content;
`;

export { ChatMessage, InfoMessage };
