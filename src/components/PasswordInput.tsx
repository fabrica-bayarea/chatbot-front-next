import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';

import { Button, MainInput } from './styled';
import type { PasswordInputProps } from '@/types';

const Container = styled.div`
  position: relative;

  input {
    padding-right: 50px;
  }

  button {
    aspect-ratio: 2 / 1;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translate(0, -50%);
    width: 40px;
  }
`;

function PasswordInput({ name, ...attributes }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <MainInput
        type={showPassword ? 'text' : 'password'}
        id={`${name}-input`}
        name={name}
        {...attributes}
      />
      <Button type="button" onClick={() => setShowPassword(!showPassword)}>
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
      </Button>
    </Container>
  );
}

export default PasswordInput;
