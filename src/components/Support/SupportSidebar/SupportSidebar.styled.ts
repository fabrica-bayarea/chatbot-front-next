import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

export const Container = styled.aside<{ $isVisible: boolean }>`
  background-color: white;
  box-shadow: 1px 0 4px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: calc(100dvh - 50px);
  min-width: 300px;
  padding-top: 120px;
  position: relative;
  z-index: 100;

  & > h1 {
    color: var(--clr-b);
    font-size: 2rem;
    padding: 0 20px;
    text-align: center;
  }

  & > footer {
    background-color: var(--clr-c);
    background-image: linear-gradient(
      to bottom right,
      rgba(255 255 255 / 10%),
      rgba(255 255 255 / 0%) 80%
    );

    & > nav {
      display: flex;
      justify-content: space-evenly;
    }
  }

  ${mediaQueries.laptopS} {
    left: ${({ $isVisible }) => ($isVisible ? 0 : '-280px')};
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

    & > span {
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
  left: 12px;
  position: absolute;
  top: 5px;
  visibility: hidden;
  z-index: 100;

  ${mediaQueries.laptopS} {
    visibility: visible;
  }
`;
