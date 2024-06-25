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

export const MainInput = styled(Input)`
  border: 1px solid var(--clr-lighter-gray);
  font-size: 1em;
`;

export const TextArea = styled.textarea`
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  resize: none;
`;

export const AdaptiveTextArea = styled(TextArea)`
  border: none;
  border-radius: 4px;
  flex-grow: 10;
  min-height: 50px;
  outline: none;
  padding: 10px;

  &::placeholder {
    color: var(--clr-light-gray);
    transition: opacity 200ms ease;
  }

  &:focus::placeholder {
    opacity: 0;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-a);
  }
`;
