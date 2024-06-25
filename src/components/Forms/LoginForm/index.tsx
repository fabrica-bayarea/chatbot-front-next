'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { type ChangeEvent, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { signIn } from '@/actions/auth';
import { SubmitButton } from '@/components/Buttons';
import InputGroup from '@/components/Forms/InputGroup';
import { MainForm, StatusContainer } from '@/components/styled';
import { useValidation } from '@/hooks';
import type { InputScheme, StatusMessage } from '@/utils/definitions';

const inputSchemes: { [key: string]: InputScheme } = {
  email: { isRequired: true, label: 'E-mail', value: '' },
  password: { isRequired: true, label: 'Senha', value: '' },
};

function LoginForm() {
  const path = usePathname();
  const [inputs, setInputs] = useState(inputSchemes);
  const [statusMessage, setStatusMessage] = useState('');
  const validation = useValidation(inputs);

  const [formState, formAction] = useFormState(
    (prevState: StatusMessage, formData: FormData) => signIn(formData, path),
    { message: '' }
  );

  // Input handler
  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    const newInputs = { ...inputs };
    newInputs[name].value = value;
    setInputs(newInputs);
  };

  // Displays a status message to the user
  useEffect(() => {
    if (typeof validation === 'string') {
      setStatusMessage(validation);
    } else {
      setStatusMessage('');
    }
  }, [validation]);

  useEffect(() => {
    setStatusMessage(formState.message);
  }, [formState]);

  return (
    <MainForm action={formAction}>
      <InputGroup
        type="text"
        name="email"
        onChange={handleChange}
        placeholder="Digite seu e-mail"
        scheme={inputs.email}
      />
      <InputGroup
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Digite sua senha"
        scheme={inputs.password}
      />
      <StatusContainer>
        {statusMessage && (
          <span>
            <Image src="/error.svg" height={18} width={18} alt="Atenção" />
            {statusMessage}
          </span>
        )}
      </StatusContainer>
      <SubmitButton validation={validation}>Entrar</SubmitButton>
    </MainForm>
  );
}

export default LoginForm;
