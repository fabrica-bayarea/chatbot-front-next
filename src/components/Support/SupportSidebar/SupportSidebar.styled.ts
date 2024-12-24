import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

export const Container = styled.aside<{ $isVisible: boolean }>`
  background-color: white;
  box-shadow: 1px 0 4px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: calc(100dvh - 50px);
  min-width: 320px;
  padding-top: 120px;
  position: relative;
  z-index: 100;

  & > h1 {
    color: var(--clr-dark);
    font-size: 2rem;
    font-weight: 300;
    padding: 0 20px;
  }

  & > nav {
    align-items: center;
    background-color: var(--clr-dark-gray);
    display: flex;
    justify-content: space-evenly;
    min-height: 40px;

    a,
    button {
      height: 18px;
      width: 18px;
    }
  }

  ${mediaQueries.laptopS} {
    left: ${({ $isVisible }) => ($isVisible ? 0 : '-320px')};
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    position: absolute;
    transition: left 400ms ease, opacity 400ms ease;
  }
`;

export const List = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  overflow-y: scroll;

  & > span:first-child {
    color: var(--clr-dark-gray);
    margin: 80px 0 40px;
    font-size: 1.2rem;
  }

  & > span:nth-child(2) {
    color: var(--clr-a);
    font-size: 2.5rem;
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
  gap: 10px;
  padding: 20px;
  transition: background-color 200ms ease;
  width: 100%;

  &:hover {
    background-color: var(--clr-light);
  }

  &.selected {
    background-color: var(--clr-a);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--clr-light);
  }

  & > div:nth-child(2) {
    flex-grow: 10;

    & > div:nth-child(2) {
      font-size: 0.75rem;
    }
  }
`;

export const LoadingItem = styled(ListItem)`
  cursor: default;

  &:hover {
    background-color: unset;
  }
`;

export const OpenCloseContainer = styled.div`
  left: 20px;
  position: absolute;
  top: 10px;
  visibility: hidden;
  z-index: 1000;

  ${mediaQueries.laptopS} {
    visibility: visible;
  }
`;
