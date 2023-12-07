import styled, { css } from 'styled-components';

type ChatMessageProps = {
  $inverted?: boolean;
  $role: 'assistant' | 'collaborator' | 'error' | 'suggestion' | 'user';
};

export const ChatMessage = styled.span<{ $bgColor?: string; $right?: boolean }>`
  --r: 8px;
  --radius: var(--r) var(--r) var(--r) 0;
  --radius-inverted: var(--r) var(--r) 0 var(--r);

  align-self: ${({ $right }) => ($right ? 'flex-end' : 'flex-start')};
  background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : 'var(--clr-a)')};
  border-radius: ${({ $right }) => ($right ? 'var(--radius-inverted)' : 'var(--radius)')};
  padding: 15px;
  width: fit-content;
`;

export const InfoMessage = styled.span<{ $bgColor?: string }>`
  align-self: center;
  background-color: ${({ $bgColor }) => $bgColor ?? 'var(--clr-dark-gray)'};
  border-radius: 4px;
  color: var(--clr-light);
  font-size: 0.75rem;
  margin: 40px 0;
  padding: 5px 10px;
  width: fit-content;
`;
