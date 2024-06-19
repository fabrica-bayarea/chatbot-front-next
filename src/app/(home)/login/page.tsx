'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';

import { signInWithGoogle } from '@/actions/auth';
import LoginForm from '@/components/LoginForm';
import { MainButton, SocialButton } from '@/components/styled';

const Container = styled.div`
  align-items: unset;
  gap: 10px;
  padding: 0 60px;
`;

function Login() {
  const path = usePathname();
  const router = useRouter();

  return (
    <>
      <header>
        <h2>Login</h2>
      </header>
      <Container>
        <LoginForm />
        <MainButton onClick={() => router.push('/registro')}>Registro</MainButton>
        <hr />
        <SocialButton onClick={() => signInWithGoogle(path)}>
          <Image src={'/logoGoogle.png'} width={30} height={30} alt="Logo Google" />
          <span>Continuar com Google</span>
        </SocialButton>
      </Container>
    </>
  );
}

export default Login;
