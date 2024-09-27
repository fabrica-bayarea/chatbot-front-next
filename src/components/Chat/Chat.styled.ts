import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  max-height: calc(100dvh - 80px);
  padding-bottom: 70px;
  position: relative;
`;

export const Conversation = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 60px;
  overflow-y: scroll;
  padding: 80px calc(20% - 6px) 80px 20%;
  scroll-behavior: smooth;

  & > div:first-of-type {
    display: flex;
    gap: 10px;

    & > img {
      opacity: 0.9;
      position: relative;
      top: 20px;
    }
  }

  & > .redirect-status {
    font-size: 0.9rem;
    margin: 40px 20px 0;
    text-align: center;

    & > p {
      font-style: italic;
      margin-bottom: 20px;
    }

    & > span {
      font-weight: bold;
    }
  }

  & > *:not(.redirect-status) {
    opacity: ${({ $open }) => ($open ? '1' : '0.6')};
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-a);
  }

  ${mediaQueries.laptopS} {
    padding: 40px 74px 40px 80px;
  }

  ${mediaQueries.mobileL} {
    padding: 40px 34px 40px 40px;
  }
`;

export const Loading = styled.div`
  align-items: center;
  display: flex;
  min-height: 40px;
`;
