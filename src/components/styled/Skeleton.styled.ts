import styled from 'styled-components';

export const Skeleton = styled.div<{ $height: string; $width: string }>`
  animation: loading 1.5s infinite;
  background: linear-gradient(
    90deg,
    var(--clr-light) 25%,
    var(--clr-a) 50%,
    var(--clr-light) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  height: ${({ $height }) => $height};
  opacity: 0.4;
  width: ${({ $width }) => $width};
`;

export const SkeletonContainer = styled.div<{ $gap: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};
`;
