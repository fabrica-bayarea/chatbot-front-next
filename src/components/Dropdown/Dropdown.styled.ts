import styled from 'styled-components';

import { Button } from '@/components/styled';

export const Container = styled.div`
  position: relative;
`;

export const DropdownButton = styled(Button)`
  background-color: var(--clr-c);
  color: var(--clr-light);
  justify-content: flex-start;
  padding: 10px 20px;

  &:hover {
    background-color: var(--clr-b);
  }
`;

export const Navigation = styled.nav<{ $isVisible: boolean }>`
  border: 1px solid var(--clr-d);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  position: absolute;
  right: 0;
  top: ${({ $isVisible }) => ($isVisible ? '50px' : '30px')};
  visibility: ${({ $isVisible }) => ($isVisible ? 'isVisible' : 'hidden')};
  transition: opacity 400ms ease, top 400ms ease, visibility 400ms ease;
  width: 180px;
  z-index: 10;
`;
