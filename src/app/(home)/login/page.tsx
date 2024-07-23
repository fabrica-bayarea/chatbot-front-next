'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';

import { signInAnonymously, signInWithGoogle } from '@/actions/auth';
import { LoginForm } from '@/components/Forms';
import { MainButton, SocialButton } from '@/components/styled';

const Container = styled.div`
  align-items: unset;
  gap: 10px;
  padding: 0 60px;

  & > hr {
    background: linear-gradient(
      to right,
      transparent,
      var(--clr-lighter-gray),
      transparent
    );
    border: none;
    height: 2px;
    margin: 20px 0;
    width: 100%;
  }
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
        {/* <SocialButton onClick={() => signInWithGoogle(path)}>
          <Image src={'/google_g.png'} width={30} height={30} alt="Logo Google" />
          <span>Continuar com Google</span>
        </SocialButton> */}
        <SocialButton onClick={() => signInAnonymously()}>
          Continuar anonimamente
        </SocialButton>
      </Container>
    </>
  );
}

export default Login;
