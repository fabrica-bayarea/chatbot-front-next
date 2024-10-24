import styled, { css } from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

export const ActionButton = styled.button`
  aspect-ratio: 1;
  background-color: var(--clr-b);
  background-image: linear-gradient(
    to bottom right,
    rgba(255 255 255 / 40%),
    rgba(255 255 255 / 0%) 50%
  );
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  color: white;
  font-size: 2rem;
  width: 50px;

  & > img {
    left: 2px;
    position: relative;
  }
`;

export const AltButton = styled.button`
  align-items: center;
  border: 1px solid var(--clr-light);
  border-radius: 50px;
  color: var(--clr-light);
  display: flex;
  font-size: 1rem;
  height: 50px;
  justify-content: center;
  position: relative;
  width: 250px;

  &:disabled {
    opacity: 0.6;
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

export const DialogButton = styled.button<{ $width?: string }>`
  align-items: center;
  border: 1px solid var(--clr-a);
  border-radius: 4px;
  display: flex;
  height: 40px;
  justify-content: center;
  padding: 0 10px;
  transition: background-color 200ms ease;
  width: ${({ $width }) => $width ?? '60px'};

  &:hover:not(:disabled) {
    background-color: var(--clr-a);
  }
`;

export const DropdownButton = styled.button`
  background-color: var(--clr-c);
  color: var(--clr-light);
  font-size: 0.9rem;
  padding: 10px;
  text-align: start;

  &:hover {
    background-color: var(--clr-b);
  }
`;

export const EmailButton = styled.button`
  background-color: var(--clr-b);
  border-radius: 4px;
  color: white;
  font-size: 16px;
  padding: 20px 40px;

  &:disabled {
    opacity: 0.6;
  }
`;

export const IconButton = styled.button<{
  $bgColor?: string;
  $hover?: boolean;
  $selected?: boolean;
  $width?: string;
}>`
  align-items: center;
  aspect-ratio: 1;
  background-color: ${({ $bgColor }) => $bgColor ?? 'transparent'};
  border-radius: 50%;
  box-shadow: ${({ $bgColor }) => ($bgColor ? '0 2px 4px 0 rgb(0 0 0 / 20%)' : 'none')};
  display: flex;
  font-size: 1.5em;
  justify-content: center;
  width: ${({ $width }) => $width ?? '40px'};

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

export const MainButton = styled.button`
  align-items: center;
  border: 2px solid var(--clr-b);
  border-radius: 50px;
  color: var(--clr-b);
  display: flex;
  font-size: 1.2em;
  height: 50px;
  justify-content: center;
  width: 100%;
`;

export const MessageButton = styled.button`
  align-items: center;
  background-color: var(--clr-light);
  border: 1px solid var(--clr-gray);
  border-radius: 4px;
  display: flex;
  font-size: 0.9rem;
  height: 40px;
  justify-content: center;
  transition: background-color 200ms ease;
  width: 100px;

  &:hover:not(:disabled) {
    background-color: var(--clr-lightgray);
  }
`;

export const SocialButton = styled.button`
  align-items: center;
  border: 2px solid var(--clr-light-gray);
  border-radius: 50px;
  color: var(--clr-dark);
  display: flex;
  height: 50px;
  padding: 0 10px;
  width: 100%;

  & > span {
    flex-grow: 10;
  }
`;
