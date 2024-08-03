import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

export const Container = styled.div<{ $visible: boolean }>`
  align-items: center;
  background-color: var(--clr-light);
  border-top: 1px solid var(--clr-a);
  bottom: 0;
  box-shadow: 0 -1px 2px 0 rgb(0 0 0 / 10%);
  display: flex;
  gap: 20px;
  height: 100px;
  justify-content: space-between;
  left: 0;
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  padding: 0 40px;
  position: fixed;
  transition: opacity 400ms ease;
  width: 100%;
  z-index: 1000;

  ${mediaQueries.mobileL} {
    font-size: 0.9rem;
    padding: 0 20px;
  }

  ${mediaQueries.mobileM} {
    font-size: 0.8rem;
    padding: 0 10px;
  }
`;
