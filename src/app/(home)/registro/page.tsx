'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { RegistrationForm } from '@/components/Forms';
import { IconButton } from '@/components/styled';

const Container = styled.div`
  align-items: unset;
  gap: 10px;
  padding: 0 60px;
`;

function Registration() {
  const router = useRouter();

  return (
    <>
      <header>
        <h2>Registro</h2>
        <IconButton onClick={() => router.push('/login')} $bgColor="white">
          <Image src="/chevron_backward.svg" height={24} width={24} alt="Página de login" />
        </IconButton>
      </header>
      <Container>
        <RegistrationForm />
      </Container>
    </>
  );
}

export default Registration;
