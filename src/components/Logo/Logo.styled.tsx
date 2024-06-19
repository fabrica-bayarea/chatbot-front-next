import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  top: -20px;

  @media screen and (width <= 1024px) {
    display: none;
  }
`;

export const LogoImage = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 50px;
  border-bottom-left-radius: 0;
  display: flex;
  height: 80px;
  justify-content: center;
  width: 160px;

  & > div {
    background-color: var(--clr-b);
    border-radius: 50px;
    height: 48px;
    position: relative;
    width: 128px;

    &::before,
    &::after {
      content: '';
      aspect-ratio: 1;
      background-color: var(--clr-d);
      border-radius: 50%;
      position: absolute;
      top: 16px;
      width: 16px;
    }

    &::before {
      left: 32px;
    }

    &::after {
      right: 32px;
    }
  }
`;

export const LogoText = styled.h1`
  color: white;
  font-family: var(--font-b);
  font-size: 5rem;
`;

export const TextContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 40px;
`;
