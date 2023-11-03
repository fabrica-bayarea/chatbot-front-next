import styled, { css } from 'styled-components';

const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: inherit;
  justify-content: center;

  &:disabled {
    cursor: unset;
  }
`;

const DialogButton = styled(Button)`
  border: 1px solid var(--clr-c);
  border-radius: 5px;
  min-width: 60px;
  padding: 10px;

  &:hover:not(:disabled) {
    background-color: var(--clr-c);
  }

  &:disabled {
    opacity: 0.4;
  }
`;

const DropdownButton = styled(Button)`
  background-color: var(--clr-a);
  color: var(--clr-light);
  justify-content: flex-start;
  letter-spacing: 1px;
  padding: 10px 20px;

  &:hover {
    background-color: var(--clr-b);
  }
`;

const IconButton = styled(Button)`
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  color: ${(props) => props.$color || 'var(--clr-dark)'};
  font-size: 1.5em;
  height: 40px;
  scale: ${(props) => props.$scale || 1};

  ${(props) =>
    props.$bg === 'white' &&
    css`
      background-color: white;
      box-shadow: 0 4px 4px 0 rgb(0 0 0 / 20%);
      color: var(--clr-d);
    `}

  ${(props) =>
    props.$bg === 'color' &&
    css`
      background: var(--gradient-a);
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
      color: var(--clr-light);
    `}
`;

const MainButton = styled(Button)`
  border: 2px solid var(--clr-b);
  border-radius: 25px;
  color: var(--clr-a);
  font-size: 1.2em;
  height: 50px;
  padding: 0 10px;
  width: 250px;

  &:disabled {
    opacity: 0.4;
  }
`;

export { Button, DialogButton, DropdownButton, IconButton, MainButton };
