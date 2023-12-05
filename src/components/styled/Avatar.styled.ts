import styled, { css } from 'styled-components';

type AvatarProps = {
  $fontSize?: string;
  $imageUrl?: string;
  $width?: string;
  $border?: boolean;
};

export const Avatar = styled.div<AvatarProps>`
  align-items: center;
  aspect-ratio: 1;
  background-color: var(--clr-c);
  border: ${({ $border }) => ($border ? '4px solid white' : 'none')};
  border-radius: 50%;
  box-shadow: ${({ $border }) => ($border ? 'none' : '0 2px 4px rgb(0 0 0 / 20%)')};
  color: white;
  display: flex;
  font-size: ${(props) => props.$fontSize ?? '1.5rem'};
  justify-content: center;
  width: ${(props) => props.$width ?? '60px'};
  user-select: none;

  ${({ $imageUrl }) =>
    $imageUrl &&
    css`
      background-image: url(${$imageUrl});
      background-size: cover;
      background-position: center;
      color: transparent;
    `}
`;
