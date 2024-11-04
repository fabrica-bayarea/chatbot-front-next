import styled, { css } from 'styled-components';

export const Presence = styled.div<{ $presence: boolean }>`
  aspect-ratio: 1;
  background-color: var(--clr-d);
  border: 1px solid white;
  border-radius: 50%;
  box-shadow: 0 0 4px 2px rgb(255 210 210 / 20%);
  opacity: 0.8;
  width: 16px;

  ${({ $presence }) =>
    $presence &&
    css`
      background-color: var(--clr-green);
      box-shadow: 0 0 4px 2px rgb(210 255 210 / 20%);
    `}
`;
