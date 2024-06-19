import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  position: relative;

  & > span {
    bottom: -25px;
    font-size: 0.75rem;
    left: 25px;
    position: absolute;
  }
`;

export const Container = styled.header`
  align-items: center;
  background-color: var(--clr-b);
  background-image: linear-gradient(
    to bottom right,
    rgba(255 255 255 / 10%),
    rgba(255 255 255 / 0%) 50%
  );
  border-bottom: 1px solid var(--clr-a);
  color: var(--clr-light);
  display: flex;
  gap: 20px;
  height: 150px;
  padding: 0 120px;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 10px;

  & > span:first-child {
    font-size: 2rem;
    left: -2px;
    position: relative;
  }
`;
