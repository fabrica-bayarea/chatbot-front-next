import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

export const Container = styled.aside<{ $isVisible: boolean }>`
  background-color: var(--clr-c);
  height: 100dvh;
  min-width: 320px;
  padding: 10px;
  z-index: 100;

  & > div {
    align-items: center;
    background-color: white;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;

    & > header {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin: 60px 0 20px;
      padding: 0 20px;
      width: 100%;

      & > h1 {
        color: var(--clr-b);
        font-size: 2rem;
        letter-spacing: 1px;
      }
    }

    & > footer {
      display: flex;
      justify-content: flex-end;
      padding: 20px;
      width: 100%;
    }
  }

  ${mediaQueries.laptopS} {
    left: ${({ $isVisible }) => ($isVisible ? 0 : '-320px')};
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    position: absolute;
    transition: left 400ms ease, opacity 400ms ease;
  }
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > span:nth-child(1) {
    font-size: 0.75em;
  }

  & > span:nth-child(2) {
    font-size: 0.75em;
    margin-bottom: 10px;
  }

  & > span:nth-child(3) {
    font-size: 0.9em;
  }
`;

export const List = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  overflow-y: scroll;

  & > span {
    margin: 120px 0 40px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-a);
  }
`;

export const ListItem = styled.li`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding: 20px;
  transition: background-color 200ms ease;
  width: 100%;

  &:hover {
    background-color: var(--clr-light);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--clr-light);
  }
`;

export const LoadingItem = styled(ListItem)`
  cursor: default;

  &:hover {
    background-color: unset;
  }
`;
