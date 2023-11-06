'use client';

import { faChevronLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import { InputGroup, Logo } from '@/components';
import { IconButton, MainButton, Form, Main, Section } from '@/components/styled';
import { useMainContext, useValidation } from '@/hooks';
import type { InputSchemeType, MessageType, RegisterBodyType } from '@/types';

const inputScheme: InputSchemeType = {
  email: { value: '', isRequired: true },
  name: { value: '', isRequired: true },
  password: { value: '', isRequired: true },
  confirmation: { value: '', isRequired: true },
};

function Register() {
  const { isLoading, register } = useMainContext();
  const [inputs, setInputs] = useState(inputScheme);
  const [statusMessage, setStatusMessage] = useState('');
  const router = useRouter();
  const validation = useValidation(inputs);

  // Input handler
  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    const newInputs = { ...inputs };
    newInputs[name].value = value;
    setInputs(newInputs);
  };

  // Register
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const body: RegisterBodyType = {
      email: inputs.email.value,
      name: inputs.name.value,
      password: inputs.password.value,
    };

    const [success, data] = await register({ body });

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
          <h2>Registro</h2>
          <IconButton type="button" onClick={() => router.push('/login')} $bg={'white'}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </IconButton>
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
              type="text"
              name="name"
              value={inputs.name.value}
              onChange={handleChange}
              placeholder="Digite seu nome..."
              label="Primeiro nome *"
            />
            <InputGroup
              type="password"
              name="password"
              value={inputs.password.value}
              onChange={handleChange}
              placeholder="Digite uma senha..."
              label="Senha *"
            />
            <InputGroup
              type="password"
              name="confirmation"
              value={inputs.confirmation.value}
              onChange={handleChange}
              placeholder="Confirme sua senha..."
              label="Confirmação de senha *"
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
              {isLoading ? <BeatLoader color="blue" size={8} /> : 'Registrar'}
            </MainButton>
          </Form>
        </div>
      </Section>
    </Main>
  );
}

export default Register;
