'use client';

import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import InputGroup from './InputGroup';
import SubmitButton from './SubmitButton';
import { ColumnForm } from './styled';
import { register } from '@/app/actions';
import { useValidation } from '@/hooks';
import type { InputScheme, StatusMessage } from '@/lib/definitions';

const inputSchemes: { [key: string]: InputScheme } = {
  email: { isRequired: true, label: 'E-mail', value: '' },
  name: { isRequired: true, label: 'Nome', value: '' },
  password: { isRequired: true, label: 'Senha', value: '' },
  confirmation: { isRequired: true, label: 'Confirmação de senha', value: '' },
};

function RegisterForm() {
  const [inputs, setInputs] = useState(inputSchemes);
  const [statusMessage, setStatusMessage] = useState('');
  const validation = useValidation(inputs);

  const [formState, formAction] = useFormState(
    (prevState: StatusMessage, formData: FormData) => register(formData),
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
    <ColumnForm action={formAction}>
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
      <SubmitButton validation={validation}>Registrar</SubmitButton>
    </ColumnForm>
  );
}

export default RegisterForm;
