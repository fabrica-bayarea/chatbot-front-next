'use client';

import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
  top: -40px;
`;

const TextContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 40px;
`;

const LogoImage = styled.div`
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

const LogoText = styled.h1`
  color: white;
  font-family: var(--font-b);
  font-size: 5rem;
  /* letter-spacing: -2px; */
`;

function Logo() {
  return (
    <Container>
      <LogoImage>
        <div></div>
      </LogoImage>
      <TextContainer>
        <LogoText>Chatbot</LogoText>
        <Image
          src="/logoIesb.png"
          height={60}
          width={60}
          alt="Logo IESB"
          style={{ backgroundColor: 'white', padding: '2px' }}
        />
      </TextContainer>
    </Container>
  );
}

export default Logo;
