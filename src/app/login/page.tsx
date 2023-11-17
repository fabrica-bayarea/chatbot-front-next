'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import { InputGroup, Logo } from '@/components';
import { MainButton, Form, Main, Section } from '@/components/styled';
import { useMainContext, useValidation } from '@/hooks';
import type { InputSchemeType, StatusMessageType } from '@/types';

const inputScheme: { [key: string]: InputSchemeType } = {
  email: { isRequired: true, label: 'E-mail', value: '' },
  password: { isRequired: true, label: 'Senha', value: '' },
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

  // Make a login request and redirect to Home or show an error message
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const body = {
      email: inputs.email.value,
      password: inputs.password.value,
    };

    const [success, data] = await login({ body });

    if (success) {
      router.push('/');
    } else {
      setStatusMessage((data as StatusMessageType).message);
    }
  };

  // Display the validation message to the user, if it exists
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
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Digite seu e-mail..."
              scheme={inputs.email}
            />
            <InputGroup
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Digite sua senha..."
              scheme={inputs.password}
            />
            <div>
              {statusMessage && (
                <span>
                  <Image
                    src="/circle_exclamation.svg"
                    height={16}
                    width={16}
                    alt="Exclamation icon"
                  />
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
