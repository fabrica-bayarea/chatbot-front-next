import styled, { css } from 'styled-components';

import type { SupportStatus } from '@/utils/definitions';

export const Container = styled.aside`
  background-color: var(--clr-light);
  border-right: 1px solid var(--clr-a);
  box-shadow: 1px 0 4px 0 rgb(0 0 0 / 10%);
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 360px;
`;

export const Footer = styled.footer`
  align-items: center;
  background-color: var(--clr-b);
  background-image: linear-gradient(
    to bottom right,
    rgba(255 255 255 / 10%),
    rgba(255 255 255 / 0%) 50%
  );
  border-top: 2px solid var(--clr-b);
  box-shadow: 0 -1px 4px 0 rgb(0 0 0 / 20%);
  color: var(--clr-light);
  display: flex;
  font-size: 0.9rem;
  height: 60px;
  justify-content: space-evenly;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  height: 160px;
  justify-content: space-between;
  margin-bottom: 80px;
  padding: 20px 20px 0;

  & > h1 {
    color: var(--clr-b);
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
  transition: background-color ease-in 200ms;

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
