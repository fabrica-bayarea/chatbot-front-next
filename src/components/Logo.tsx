import styled from 'styled-components';

import { mediaQueries } from '@/utils';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  scale: 1.2;

  ${mediaQueries.laptopS} {
    scale: 0.8;
  }
`;

const LogoImage = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 50px;
  border-bottom-left-radius: 0;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 180px;

  & > div {
    background-color: var(--clr-b);
    border-radius: 30px;
    height: 60px;
    position: relative;
    width: 140px;

    &::before,
    &::after {
      content: '';
      aspect-ratio: 1;
      background-color: var(--clr-d);
      border-radius: 50%;
      position: absolute;
      top: 20px;
      width: 20px;
    }

    &::before {
      left: 30px;
    }

    &::after {
      right: 30px;
    }
  }
`;

const LogoText = styled.h1`
  color: white;
  font-size: 5em;
`;

function Logo() {
  return (
    <Container>
      <LogoImage>
        <div></div>
      </LogoImage>
      <LogoText>Chatbot</LogoText>
    </Container>
  );
}

export default Logo;
