import styled, { css } from 'styled-components';

import type { SupportStatus } from '@/utils/definitions';

export const Container = styled.aside<{ $isVisible: boolean }>`
  background-color: var(--clr-lighter);
  box-shadow: 1px 0 4px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: calc(100dvh - 40px);
  min-width: 280px;
  padding-top: 120px;
  position: relative;
  z-index: 100;

  & > footer {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }

  & > h1 {
    padding: 0 20px;
  }

  @media screen and (width <= 1024px) {
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

  &:not(:last-child) {
    border-bottom: 1px solid var(--clr-light);
  }

  &:hover {
    background-color: var(--clr-light);
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
`;

export const OpenCloseContainer = styled.div`
  left: 12px;
  position: absolute;
  top: 0;
  visibility: hidden;
  z-index: 100;

  @media screen and (width <= 1024px) {
    visibility: visible;
  }
`;

export const Skeleton = styled.div`
  animation: loading 1.2s infinite;
  background: linear-gradient(
    90deg,
    var(--clr-light) 25%,
    var(--clr-a) 50%,
    var(--clr-light) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  height: 20px;
  opacity: 0.4;
  width: 140px;

  &:nth-child(2) {
    height: 15px;
    width: 80px;
  }
`;

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Status = styled.div<{ $status?: SupportStatus }>`
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
