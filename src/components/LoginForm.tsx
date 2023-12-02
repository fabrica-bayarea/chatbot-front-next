'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import InputGroup from './InputGroup';
import SubmitButton from './SubmitButton';
import { ColumnForm } from './styled';
import { login } from '@/app/actions';
import { useValidation } from '@/hooks';
import type { InputScheme, StatusMessage } from '@/lib/definitions';

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
    (prevState: StatusMessage, formData: FormData) => login(formData, path),
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
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Digite sua senha..."
        scheme={inputs.password}
      />
      <div className='status'>
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
      <SubmitButton validation={validation}>Entrar</SubmitButton>
    </ColumnForm>
  );
}

export default LoginForm;
