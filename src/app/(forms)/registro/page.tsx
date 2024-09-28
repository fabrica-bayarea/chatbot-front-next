'use client';

import Image from 'next/image';
import styled from 'styled-components';

import { RegistrationForm } from '@/components/Forms';
import { IconButton } from '@/components/styled';

const Container = styled.div`
  align-items: unset;
  gap: 10px;
  padding: 0 60px;
`;

function Registration() {
  return (
    <>
      <header>
        <h2>Registro</h2>
        <IconButton as="a" href="/login" $bgColor="white">
          <Image
            src="/chevron_backward.svg"
            height={24}
            width={24}
            alt="Página de login"
          />
        </IconButton>
      </header>
      <Container>
        <RegistrationForm />
      </Container>
    </>
  );
}

export default Registration;
