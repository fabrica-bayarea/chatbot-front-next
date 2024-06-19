import styled from 'styled-components';

import { IconButton } from '@/components/styled';

export const Container = styled.div`
  position: relative;
`;

export const Navigation = styled.nav<{ $visible: boolean }>`
  border: 1px solid var(--clr-d);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  position: absolute;
  right: 0;
  top: ${({ $visible }) => ($visible ? '50px' : '30px')};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transition: opacity 400ms ease, top 400ms ease, visibility 400ms ease;
  width: 180px;
  z-index: 10;
`;

export const ToggleButton = styled(IconButton)`
  font-size: 2em;
  z-index: 100;
`;
