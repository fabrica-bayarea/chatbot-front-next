import styled, { css } from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

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
  border: 1px solid var(--clr-light);
  border-radius: 50px;
  color: var(--clr-light);
  font-size: 1rem;
  height: 50px;
  position: relative;
  width: 250px;

  &:disabled {
    opacity: 0.75;
  }

  & > div {
    position: absolute;
    right: 20px;
  }

  ${mediaQueries.laptopL} {
    border: unset;
    border-radius: unset;
    height: 40px;
    justify-content: flex-start;
    padding-left: 20px;
    width: 240px;

    &:hover {
      background-color: var(--clr-c);
    }
  }
`;

export const DialogButton = styled(Button)<{ $width?: string }>`
  border: 1px solid var(--clr-a);
  border-radius: 4px;
  height: 40px;
  padding: 0 10px;
  transition: background-color 200ms ease;
  width: ${({ $width }) => $width ?? '60px'};

  &:hover:not(:disabled) {
    background-color: var(--clr-a);
  }
`;

export const EmailButton = styled(Button)`
  background-color: var(--clr-b);
  border-radius: 4px;
  color: white;
  font-size: 16px;
  padding: 20px 40px;

  &:disabled {
    opacity: 0.75;
  }
`;

export const IconButton = styled(Button)<{
  $bgColor?: string;
  $hover?: boolean;
  $selected?: boolean;
  $width?: string;
}>`
  aspect-ratio: 1 / 1;
  background-color: ${({ $bgColor }) => $bgColor ?? 'transparent'};
  border-radius: 50%;
  box-shadow: ${({ $bgColor }) => ($bgColor ? '0 2px 4px 0 rgb(0 0 0 / 20%)' : 'none')};
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
  border-radius: 50px;
  color: var(--clr-b);
  font-size: 1.2em;
  height: 50px;
  width: 100%;

  &:disabled {
    opacity: 0.4;
  }
`;

export const SendButton = styled(IconButton)`
  background-color: var(--clr-b);
  background-image: linear-gradient(
    to bottom right,
    rgba(255 255 255 / 50%),
    rgba(255 255 255 / 0%) 40%
  );
  box-shadow: 1px 1px 2px 1px rgb(0 0 0 / 20%);
  min-width: 50px;

  & > img {
    left: 2px;
    position: relative;
  }
`;

export const SocialButton = styled(Button)`
  border: 2px solid var(--clr-light-gray);
  border-radius: 50px;
  color: var(--clr-dark);
  height: 50px;
  padding: 0 10px;
  width: 100%;

  & > span {
    flex-grow: 10;
  }
`;
