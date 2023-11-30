import styled, { css } from 'styled-components';

const ChatMessage = styled.span<{ $role: string }>`
  --r: 5px;

  line-height: 20px;
  padding: 10px;
  width: fit-content;

  ${(props) =>
    props.$role === 'assistant' &&
    css`
      background-color: var(--clr-a);
      border-radius: var(--r) var(--r) var(--r) 0;
    `}

  ${(props) =>
    props.$role === 'error' &&
    css`
      align-self: center;
      background-color: var(--clr-c);
      border-radius: var(--r);
      color: var(--clr-light);
      padding: 8px;
    `}

  ${(props) =>
    props.$role === 'suggestion' &&
    css`
      align-self: flex-end;
      background-color: var(--clr-lighter-gray);
      border-radius: var(--r) var(--r) 0 var(--r);
      cursor: pointer;

      &:hover {
        background-color: var(--clr-light-gray);
      }
    `}

  ${(props) =>
    props.$role === 'user' &&
    css`
      align-self: flex-end;
      background-color: var(--clr-lighter-gray);
      border-radius: var(--r) var(--r) 0 var(--r);
    `}
`;

const InfoMessage = styled.span`
  align-self: center;
  background-color: var(--clr-dark-gray);
  border-radius: 5px;
  color: var(--clr-light);
  font-size: 0.9rem;
  font-style: italic;
  margin: 20px 0;
  padding: 5px 10px;
  width: fit-content;
`;

export { ChatMessage, InfoMessage };
