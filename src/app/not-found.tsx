'use client';

import Image from 'next/image';
import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

const Container = styled.main`
  align-items: center;
  background: linear-gradient(to bottom right, var(--clr-b), var(--clr-c));
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  min-height: 100dvh;

  & > h1 {
    color: var(--clr-light);
    font-size: 3.2rem;
    letter-spacing: 1px;
    text-align: center;
  }

  & > span {
    color: var(--clr-light);
    font-size: 4rem;
  }

  & > img {
    bottom: 20px;
    left: 20px;
    position: absolute;
  }

  ${mediaQueries.mobileL} {
    & > h1 {
      font-size: 2rem;
    }

    & > span {
      font-size: 2.5rem;
    }
  }
`;

function NotFound() {
  return (
    <Container>
      <h1>Página não encontrada.</h1>
      <span>(｡╯︵╰｡)</span>
      <Image
        src="/iesb-logo.png"
        height={60}
        width={60}
        quality={100}
        alt="Logo IESB"
        style={{ border: '2px solid white', boxSizing: 'content-box' }}
      />
    </Container>
  );
}

export default NotFound;
