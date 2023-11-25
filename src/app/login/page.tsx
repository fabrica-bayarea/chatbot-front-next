'use client';

import { useRouter } from 'next/navigation';

import LoginForm from '@/components/LoginForm';
import Logo from '@/components/Logo';
import { MainButton, Main, Section } from '@/components/styled';

function Login() {
  const router = useRouter();

  return (
    <Main>
      <Logo />
      <Section>
        <header>
          <h2>Login</h2>
        </header>
        <div>
          <LoginForm />
          <MainButton type="button" onClick={() => router.push('/registro')}>
            Registro
          </MainButton>
        </div>
      </Section>
    </Main>
  );
}

export default Login;
