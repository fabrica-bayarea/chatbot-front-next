'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Logo from '@/components/Logo';
import RegisterForm from '@/components/RegisterForm';
import { IconButton, Main, Section } from '@/components/styled';

function Register() {
  const router = useRouter();

  return (
    <Main>
      <Logo />
      <Section>
        <header>
          <h2>Registro</h2>
          <IconButton onClick={() => router.push('/login')} $bgColor="white">
            <Image
              src="/chevron_left.svg"
              height={24}
              width={24}
              alt="Chevron left icon"
            />
          </IconButton>
        </header>
        <div>
          <RegisterForm />
        </div>
      </Section>
    </Main>
  );
}

export default Register;
