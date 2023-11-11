'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import { InputGroup, Logo } from '@/components';
import { IconButton, MainButton, Form, Main, Section } from '@/components/styled';
import { useMainContext, useValidation } from '@/hooks';
import type { InputSchemeType, StatusMessageType } from '@/types';

const inputScheme: { [key: string]: InputSchemeType } = {
  email: { isRequired: true, label: 'E-mail', value: '' },
  name: { isRequired: true, label: 'Nome', value: '' },
  password: { isRequired: true, label: 'Senha', value: '' },
  confirmation: { isRequired: true, label: 'Confirmação de senha', value: '' },
};

function Register() {
  const { isLoading, register } = useMainContext();
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

  // Make the registration request and redirect to the login page or show an error message
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const body = {
      email: inputs.email.value,
      name: inputs.name.value,
      password: inputs.password.value,
    };

    const [success, data] = await register({ body });

    if (success) {
      router.push('/login');
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
          <h2>Registro</h2>
          <IconButton type="button" onClick={() => router.push('/login')} $bg="white">
            <Image
              src="/chevron_left.svg"
              height={24}
              width={24}
              alt="Chevron left icon"
            />
          </IconButton>
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
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Digite seu nome..."
              scheme={inputs.name}
            />
            <InputGroup
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Digite uma senha..."
              scheme={inputs.password}
            />
            <InputGroup
              type="password"
              name="confirmation"
              onChange={handleChange}
              placeholder="Confirme sua senha..."
              scheme={inputs.confirmation}
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
              {isLoading ? <BeatLoader color="blue" size={8} /> : 'Registrar'}
            </MainButton>
          </Form>
        </div>
      </Section>
    </Main>
  );
}

export default Register;
