'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Container } from './PasswordInput.styled';
import { MainInput } from '@/components/styled';

function PasswordInput({ name, value, ...attributes }: { name: string; value: string }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <MainInput
        type={showPassword ? 'text' : 'password'}
        id={`${name}-input`}
        name={name}
        value={value}
        {...attributes}
      />
      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        <Image
          src={showPassword ? '/visibility.svg' : '/visibility_off.svg'}
          height={16}
          width={16}
          alt="Alternar visibilidade"
        />
      </button>
    </Container>
  );
}

export default PasswordInput;
