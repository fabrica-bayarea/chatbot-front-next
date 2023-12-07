'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import RegisterForm from '@/components/RegisterForm';
import { IconButton } from '@/components/styled';

function Register() {
  const router = useRouter();

  return (
    <Fragment>
      <header>
        <h2>Registro</h2>
        <IconButton onClick={() => router.back()} $bgColor="white">
          <Image src="/chevron_left.svg" height={24} width={24} alt="Chevron left icon" />
        </IconButton>
      </header>
      <div>
        <RegisterForm />
      </div>
    </Fragment>
  );
}

export default Register;
