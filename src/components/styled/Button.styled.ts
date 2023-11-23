import styled, { css } from 'styled-components';

import type { IconButtonProps } from '@/types';

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

const AltButton = styled(Button)`
  background-color: var(--clr-b);
  border-radius: 5px;
  color: var(--clr-light);
  font-size: 0.9rem;
  padding: 10px 20px;
`;

const DialogButton = styled(Button)`
  border: 1px solid var(--clr-a);
  border-radius: 5px;
  min-width: 60px;
  padding: 10px;

  &:disabled {
    opacity: 0.4;
  }

  &:hover:not(:disabled) {
    background-color: var(--clr-a);
  }
`;

const DropdownButton = styled(Button)`
  background-color: var(--clr-c);
  color: var(--clr-light);
  justify-content: flex-start;
  letter-spacing: 1px;
  padding: 10px 20px;

  &:hover {
    background-color: var(--clr-b);
  }
`;

const IconButton = styled(Button)<IconButtonProps>`
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  font-size: 1.5em;
  min-width: ${(props) => props.$width ?? '40px'};

  ${(props) =>
    props.$bg === 'white' &&
    css`
      background-color: white;
      box-shadow: 0 4px 4px 0 rgb(0 0 0 / 20%);
    `}

  ${(props) =>
    props.$bg === 'color' &&
    css`
      background: var(--clr-d);
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
    `}
`;

const MainButton = styled(Button)`
  border: 2px solid var(--clr-b);
  border-radius: 25px;
  color: var(--clr-b);
  font-size: 1.2em;
  height: 50px;
  padding: 0 10px;
  width: 250px;

  &:disabled {
    opacity: 0.4;
  }
`;

export { Button, AltButton, DialogButton, DropdownButton, IconButton, MainButton };
