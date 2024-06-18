'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { signInWithGoogle } from '@/actions/auth';
import LoginForm from '@/components/LoginForm';
import Logo from '@/components/Logo';
import { MainButton, SocialButton, Main, Section } from '@/components/styled';

function Login() {
  const router = useRouter();

  return (
    <Main>
      <Logo />
      <Section>
        <header>
          <h2>Login</h2>
        </header>
        <div className="form-container">
          <LoginForm />
          <MainButton onClick={() => router.push('/registro')}>Registro</MainButton>
          <hr />
          <form>
            <SocialButton formAction={signInWithGoogle}>
              <Image src={'/logoGoogle.png'} width={30} height={30} alt="Logo Google" />
              <span>Continuar com Google</span>
            </SocialButton>
          </form>
        </div>
      </Section>
    </Main>
  );
}

export default Login;
