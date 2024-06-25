import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 70px;
  position: relative;
  width: 100%;
`;

export const Conversation = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 60px;
  overflow-y: scroll;
  padding: 60px 30px 0;

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
`;

export const Loading = styled.div`
  align-items: center;
  display: flex;
  min-height: 40px;
`;
