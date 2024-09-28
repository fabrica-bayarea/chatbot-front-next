import styled from 'styled-components';

export const Link = styled.a`
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const DialogLink = styled(Link)<{ $width?: string }>`
  border: 1px solid var(--clr-a);
  border-radius: 4px;
  height: 40px;
  padding: 0 10px;
  text-decoration: none;
  transition: background-color 200ms ease;
  width: ${({ $width }) => $width ?? '60px'};

  &:hover:not(:disabled) {
    background-color: var(--clr-a);
  }
`;
