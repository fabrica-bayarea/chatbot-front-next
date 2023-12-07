'use client';

import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import styled from 'styled-components';

import LoginForm from '@/components/LoginForm';
import { MainButton } from '@/components/styled';

const Container = styled.div`
  gap: 20px;
`;

function Login() {
  const router = useRouter();

  return (
    <Fragment>
      <header>
        <h2>Login</h2>
      </header>
      <Container>
        <LoginForm />
        <MainButton onClick={() => router.push('/registro')}>Registro</MainButton>
      </Container>
    </Fragment>
  );
}

export default Login;
