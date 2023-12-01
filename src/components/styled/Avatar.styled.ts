import styled from 'styled-components';

const Avatar = styled.div<{ $fontSize?: string; $width?: string }>`
  align-items: center;
  aspect-ratio: 1;
  background-color: var(--clr-c);
  border-radius: 50%;
  color: white;
  display: flex;
  font-size: ${(props) => props.$fontSize ?? '1.5rem'};
  justify-content: center;
  min-width: ${(props) => props.$width ?? '60px'};
`;

export { Avatar };
