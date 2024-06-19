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
  gap: 60px;
  overflow-y: scroll;
  padding: 40px 30px 0;

  & > div:first-of-type {
    align-items: center;
    display: flex;
    position: relative;

    & > img {
      left: -10px;
      opacity: 0.9;
      position: relative;
      top: 30px;
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
