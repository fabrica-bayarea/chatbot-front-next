import styled, { css } from 'styled-components';

type AvatarProps = {
  $fontSize?: string;
  $picture?: string;
  $width?: string;
  $border?: boolean;
};

export const Avatar = styled.div<AvatarProps>`
  align-items: center;
  aspect-ratio: 1;
  background-color: var(--clr-c);
  border: ${({ $border }) => ($border ? '2px solid white' : 'none')};
  border-radius: 50%;
  color: white;
  display: flex;
  font-size: ${(props) => props.$fontSize ?? '1rem'};
  justify-content: center;
  width: ${(props) => props.$width ?? '60px'};
  user-select: none;

  ${({ $picture }) =>
    $picture &&
    css`
      background-image: url(${$picture});
      background-position: center;
      background-size: cover;
      color: transparent;
    `}
`;

export const LoadingAvatar = styled(Avatar)`
  background-color: var(--clr-a);
  border: none;
  opacity: 0.4;
`;
