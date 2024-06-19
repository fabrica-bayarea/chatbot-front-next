'use client';

import Image from 'next/image';

import { Container, LogoImage, LogoText, TextContainer } from './Logo.styled';

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
