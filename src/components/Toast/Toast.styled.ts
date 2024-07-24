import styled from 'styled-components';

export const Container = styled.div<{ $delay: number; $visible: boolean }>`
  background-color: var(--clr-light);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  left: calc(50% - 160px);
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  position: absolute;
  top: ${({ $visible }) => ($visible ? '10px' : '-80px')};
  transition: opacity 400ms ease, top 400ms ease;
  width: 320px;
  z-index: 1000;

  & > button {
    position: absolute;
    right: 0;
    top: 0;
  }

  & > div {
    animation: ${({ $delay, $visible }) =>
      $visible ? `timeout ${$delay}ms linear` : 'none'};
    background-color: var(--clr-blue);
    height: 4px;
    width: 0;
  }

  & > span {
    align-items: center;
    display: flex;
    height: 56px;
    justify-content: center;
  }
`;
