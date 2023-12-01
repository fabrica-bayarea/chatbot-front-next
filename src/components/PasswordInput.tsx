'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import { Button, MainInput } from './styled';
import type { PasswordInputProps } from '@/lib/definitions';

const Container = styled.div`
  position: relative;

  input {
    padding-right: 50px;
  }

  button {
    aspect-ratio: 2 / 1;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 40px;
  }
`;

function PasswordInput({ name, value, ...attributes }: PasswordInputProps) {
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
      <Button onClick={() => setShowPassword(!showPassword)}>
        <Image
          src={showPassword ? '/visibility.svg' : '/visibility_off.svg'}
          height={16}
          width={16}
          alt="Visibility icon"
        />
      </Button>
    </Container>
  );
}

export default PasswordInput;
