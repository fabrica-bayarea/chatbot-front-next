import styled from 'styled-components';

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  & > div:last-child {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
  }

  @media screen and (width <= 667px) {
    & > div:last-child {
      align-items: center;
      flex-direction: column;
      gap: 10px;
    }
  }
`;
