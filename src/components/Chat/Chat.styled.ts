import styled from 'styled-components';

import { IconButton } from '@/components/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 40px;
  width: 100%;
`;

export const Conversation = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 40px;
  overflow-y: scroll;
  padding: 30px 24px 0 40px;

  & > div:first-of-type {
    align-items: center;
    display: flex;
    position: relative;

    & > img {
      left: -20px;
      opacity: 0.9;
      position: relative;
      top: 30px;
      z-index: 10;
    }

    &::after {
      background-color: black;
      border-radius: 50%;
      bottom: -35px;
      content: '';
      filter: blur(3px);
      height: 15px;
      left: 0;
      opacity: 0.4;
      position: absolute;
      width: 56px;
    }
  }

  & > .redirect-status {
    font-size: 0.8rem;
    margin: 40px 40px 0;
    text-align: center;

    & > p {
      font-style: italic;
      margin-bottom: 20px;
    }

    & > span {
      font-size: 0.9rem;
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
    background-color: var(--clr-c);
  }
`;

export const Loading = styled.div`
  align-items: center;
  display: flex;
  min-height: 40px;
`;

export const SendButton = styled(IconButton)`
  background-color: var(--clr-d);
  bottom: 20px;
  height: 60px;
  position: absolute;
  right: -30px;
`;
