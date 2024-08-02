'use client';

import Image from 'next/image';
import { type ReactNode } from 'react';
import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

const Container = styled.main`
  align-items: center;
  background: linear-gradient(to bottom right, var(--clr-b), var(--clr-c));
  display: flex;
  justify-content: space-evenly;
  min-height: 100dvh;

  & > a {
    display: flex;
    left: 10px;
    position: absolute;
    top: 10px;
  }
`;

const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 40px;
  position: relative;
  top: -20px;

  & > h1 {
    color: white;
    font-family: var(--font-b);
    font-size: 5.2rem;
    letter-spacing: 3px;
    position: relative;
    top: 4px;
  }

  ${mediaQueries.laptopS} {
    display: none;
  }
`;

const Section = styled.section`
  --r: 16px;

  border-radius: var(--r);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  width: 400px;

  & > div:not(.error) {
    align-items: center;
    background-color: white;
    border-radius: 0 0 var(--r) var(--r);
    display: flex;
    flex-direction: column;
    height: 600px;
    justify-content: center;
    padding-bottom: 16px;
  }

  & > header {
    align-items: center;
    background-color: var(--clr-c);
    background-image: linear-gradient(
      to bottom right,
      rgba(255 255 255 / 8%),
      rgba(255 255 255 / 0%) 80%
    );
    border-radius: var(--r) var(--r) 0 0;
    color: white;
    display: flex;
    height: 120px;
    justify-content: space-between;
    padding: 0 30px;

    & > h2 {
      font-size: 1.8rem;
    }

    & > span {
      font-size: 1.5rem;
    }
  }

  ${mediaQueries.mobileL} {
    border-radius: 0;
    min-height: 100dvh;
    width: 100%;

    & > div {
      border-radius: 0;
      flex-grow: 10;
    }

    & > header {
      border-radius: 0;
      height: 100px;
    }
  }
`;

function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <LogoContainer>
        <h1>Chatbot</h1>
        <Image
          src="/iesb-logo.png"
          height={100}
          width={100}
          quality={100}
          alt="Logo IESB"
          style={{ border: '3px solid white', boxSizing: 'content-box' }}
        />
      </LogoContainer>
      <Section>{children}</Section>
    </Container>
  );
}

export default Layout;
