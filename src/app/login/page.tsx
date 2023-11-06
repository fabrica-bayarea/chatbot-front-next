'use client';

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import { InputGroup, Logo } from '@/components';
import { MainButton, Form, Main, Section } from '@/components/styled';
import { useMainContext, useValidation } from '@/hooks';
import type { InputSchemeType, LoginBodyType, MessageType } from '@/types';

const inputScheme: InputSchemeType = {
  email: { value: '', isRequired: true },
  password: { value: '', isRequired: true },
};

function Login() {
  const { isLoading, login } = useMainContext();
  const router = useRouter();
  const [inputs, setInputs] = useState(inputScheme);
  const [statusMessage, setStatusMessage] = useState('');
  const validation = useValidation(inputs);

  // Input handler
  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    const newInputs = { ...inputs };
    newInputs[name].value = value;
    setInputs(newInputs);
  };

  // Log in
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const body: LoginBodyType = {
      email: inputs.email.value,
      password: inputs.password.value,
    };

    const [success, data] = await login({ body });

    if (success) {
      router.push('/');
    } else {
      setStatusMessage((data as MessageType).message);
    }
  };

  useEffect(() => {
    if (typeof validation === 'string') {
      setStatusMessage(validation);
    } else {
      setStatusMessage('');
    }
  }, [validation]);

  return (
    <Main>
      <Logo />
      <Section>
        <header>
          <h2>Login</h2>
        </header>
        <div>
          <Form onSubmit={handleSubmit}>
            <InputGroup
              type="email"
              name="email"
              value={inputs.email.value}
              onChange={handleChange}
              placeholder="Digite seu e-mail..."
              label="E-mail *"
            />
            <InputGroup
              type="password"
              name="password"
              value={inputs.password.value}
              onChange={handleChange}
              placeholder="Digite sua senha..."
              label="Senha *"
            />
            <div>
              {statusMessage && (
                <span>
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  {statusMessage}
                </span>
              )}
            </div>
            <MainButton type="submit" disabled={isLoading || validation !== true}>
              {isLoading ? <BeatLoader color="blue" size={8} /> : 'Entrar'}
            </MainButton>
          </Form>
          <a href="" style={{ textDecoration: 'line-through' }}>
            Esqueci minha senha
          </a>
          <MainButton type="button" onClick={() => router.push('/registro')}>
            Registro
          </MainButton>
        </div>
      </Section>
    </Main>
  );
}

export default Login;
