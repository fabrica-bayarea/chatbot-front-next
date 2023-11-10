import styled, { css } from 'styled-components';

const ChatMessage = styled.span`
  --r: 5px;

  line-height: 20px;
  padding: 10px;
  width: fit-content;

  ${(props) =>
    props.$role === 'assistant' &&
    css`
      background-color: var(--clr-light);
      border-radius: var(--r) var(--r) var(--r) 0;
      margin-left: 40px;
      position: relative;

      &::before {
        content: 'E';
        align-items: center;
        aspect-ratio: 1 / 1;
        background-color: var(--clr-d);
        border-radius: 50%;
        bottom: 0;
        color: var(--clr-light);
        display: flex;
        font-size: 0.8em;
        font-weight: bold;
        height: 30px;
        justify-content: center;
        left: -40px;
        position: absolute;
      }
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

    ${(props) =>
    props.$role === 'error' &&
    css`
      align-self: center;
      background-color: var(--clr-light-red);
      border-radius: var(--r);
      padding: 8px;
    `}
`;

export { ChatMessage };
