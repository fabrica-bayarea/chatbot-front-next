import styled from 'styled-components';

export const Input = styled.input`
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  height: 40px;
  padding: 0 10px;
  width: 100%;

  &:disabled {
    color: var(--clr-gray);
  }

  &::placeholder {
    color: var(--clr-light-gray);
    transition: opacity 200ms ease;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;

export const ChatInput = styled(Input)`
  border: none;
  border-top: 1px solid var(--clr-lighter-gray);
  font-size: 1.2em;
  height: 50px;
  padding: 0 40px;
`;

export const MainInput = styled(Input)`
  border: 1px solid var(--clr-lighter-gray);
  font-size: 1em;
`;

export const ChatTextArea = styled.textarea`
  border: 1px solid var(--clr-light-gray);
  border-radius: 4px;
  color: inherit;
  font-family: inherit;
  font-size: 1.2rem;
  height: 120px;
  padding: 10px;
  resize: none;
  width: 100%;

  &::placeholder {
    color: var(--clr-light-gray);
    transition: opacity 200ms ease;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;
