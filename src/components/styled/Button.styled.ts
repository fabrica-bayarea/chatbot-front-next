import styled, { css } from 'styled-components';

type IconButtonProps = {
  $bgColor?: string;
  $hover?: boolean;
  $selected?: boolean;
  $width?: string;
};

export const Button = styled.button`
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

export const AltButton = styled(Button)`
  background-color: var(--clr-b);
  background-image: linear-gradient(
    to bottom right,
    rgba(255 255 255 / 20%),
    rgba(255 255 255 / 0%) 40%
  );
  border: 1px solid var(--clr-b);
  border-radius: 4px;
  color: var(--clr-light);
  font-size: 0.9rem;
  height: 40px;
  width: 200px;

  &:disabled {
    opacity: 0.6;
  }
`;

export const DialogButton = styled(Button)`
  border: 1px solid var(--clr-a);
  border-radius: 5px;
  height: 40px;
  transition: background-color 200ms ease;
  width: 60px;

  &:hover:not(:disabled) {
    background-color: var(--clr-a);
  }
`;

export const DropdownButton = styled(Button)`
  background-color: var(--clr-c);
  color: var(--clr-light);
  justify-content: flex-start;
  letter-spacing: 1px;
  padding: 10px 20px;

  &:hover {
    background-color: var(--clr-b);
  }
`;

export const IconButton = styled(Button)<IconButtonProps>`
  aspect-ratio: 1 / 1;
  background-color: ${({ $bgColor }) => $bgColor ?? 'transparent'};
  border-radius: 50%;
  box-shadow: ${({ $bgColor }) => ($bgColor ? '0 4px 4px 0 rgb(0 0 0 / 20%)' : 'none')};
  font-size: 1.5em;
  min-width: ${({ $width }) => $width ?? '40px'};

  ${({ $hover, $selected }) =>
    $hover &&
    css`
      opacity: ${$selected ? '0.9' : '0.4'};
      transition: opacity 200ms ease;

      &:hover {
        opacity: 0.9;
      }
    `}
`;

export const MainButton = styled(Button)`
  border: 2px solid var(--clr-b);
  border-radius: 25px;
  color: var(--clr-b);
  font-size: 1.2em;
  height: 50px;
  width: 250px;

  &:disabled {
    opacity: 0.4;
  }
`;
