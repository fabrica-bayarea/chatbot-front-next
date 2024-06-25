import styled, { css } from 'styled-components';

import type { SupportStatus } from '@/utils/definitions';

export const Container = styled.aside<{ $isVisible: boolean }>`
  background-color: var(--clr-light);
  box-shadow: 1px 0 4px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: 100vh;
  min-width: 360px;
  position: relative;
  z-index: 100;

  & > h1 {
    color: var(--clr-b);
    font-size: 1.8rem;
    padding: 0 20px;
  }

  @media screen and (width <= 1024px) {
    left: ${({ $isVisible }) => ($isVisible ? 0 : '-280px')};
    position: absolute;
    z-index: 100;
    transition: left 400ms ease;
    min-width: 280px;
  }
`;

export const Header = styled.header`
  height: 150px;

  & > nav {
    background-color: var(--clr-c);
    background-image: linear-gradient(
      to bottom right,
      rgba(255 255 255 / 10%),
      rgba(255 255 255 / 0%) 50%
    );
    height: 50px;
    display: flex;
    justify-content: space-around;
  }
`;

export const List = styled.ul`
  flex-grow: 10;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }
`;

export const ListItem = styled.li`
  align-items: center;
  border-bottom: 1px solid var(--clr-light-gray);
  cursor: pointer;
  display: flex;
  gap: 10px;
  padding: 20px;
  transition: background-color 200ms ease;

  &:hover {
    background-color: var(--clr-light-gray);
  }

  & > div:nth-child(2) {
    flex-grow: 10;

    & > span {
      font-size: 0.75rem;
    }
  }
`;

export const OpenCloseContainer = styled.div`
  background-color: var(--clr-c);
  bottom: 80px;
  position: absolute;
  right: -40px;
  visibility: hidden;

  @media screen and (width <= 1024px) {
    visibility: visible;
  }
`;

export const Status = styled.div<{ $status: SupportStatus }>`
  aspect-ratio: 1;
  background-color: var(--clr-a);
  border-radius: 50%;
  opacity: 0.8;
  width: 20px;

  ${({ $status }) =>
    $status === 'accepted' &&
    css`
      animation: pulse 1500ms infinite;
      background-color: var(--clr-b);
    `}
`;
