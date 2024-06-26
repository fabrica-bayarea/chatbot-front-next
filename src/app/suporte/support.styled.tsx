import styled from 'styled-components';

export const Header = styled.header`
  background-color: var(--clr-c);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
  display: flex;
  height: 40px;
  justify-content: flex-end;
  padding: 0 60px;
  position: relative;
  z-index: 100;

  & > nav {
    display: flex;
    gap: 40px;
  }

  @media screen and (width <= 1024px) {
    padding: 0 20px;

    & > nav {
      gap: 20px;
    }
  }
`;

export const Main = styled.main`
  display: flex;
  min-height: calc(100vh - 40px);

  & > section {
    display: flex;
    flex-direction: column;
    flex-grow: 10;
  }
`;
