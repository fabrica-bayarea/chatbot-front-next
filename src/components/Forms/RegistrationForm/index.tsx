'use client';

import Image from 'next/image';
import { type ChangeEvent, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import { signUp } from '@/actions/auth';
import { SubmitButton, UploadButton } from '@/components/Buttons';
import InputGroup from '@/components/Forms/InputGroup';
import { MainForm, StatusContainer, UploadContainer } from '@/components/styled';
import { useValidation } from '@/hooks';
import type { InputScheme, StatusMessage } from '@/utils/definitions';

const inputSchemes: { [key: string]: InputScheme } = {
  email: { isRequired: true, label: 'E-mail', value: '' },
  name: { isRequired: true, label: 'Nome', value: '' },
  password: { isRequired: true, label: 'Senha', value: '' },
  confirmation: { isRequired: true, label: 'Confirmação de senha', value: '' },
  picture: { isRequired: false, label: 'Imagem', value: '' },
};

function RegistrationForm() {
  const [inputs, setInputs] = useState(inputSchemes);
  const [statusMessage, setStatusMessage] = useState('');
  const validation = useValidation(inputs);

  const [formState, formAction] = useFormState(
    (prevState: StatusMessage, formData: FormData) => signUp(formData),
    { message: '' }
  );

  const setPictureUrl = (value: string) => {
    setInputs({ ...inputs, picture: { ...inputs.picture, value } });
  };

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
        type="text"
        name="name"
        onChange={handleChange}
        placeholder="Digite seu nome"
        scheme={inputs.name}
      />
      <InputGroup
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Digite uma senha"
        scheme={inputs.password}
      />
      <InputGroup
        type="password"
        name="confirmation"
        onChange={handleChange}
        placeholder="Confirme sua senha"
        scheme={inputs.confirmation}
      />
      <UploadContainer>
        <InputGroup
          type="text"
          name="picture"
          onChange={handleChange}
          placeholder="Digite um endereço"
          scheme={inputs.picture}
        />
        <UploadButton setFn={setPictureUrl}>Upload</UploadButton>
      </UploadContainer>
      <StatusContainer>
        {statusMessage && (
          <span>
            <Image src="/error.svg" height={18} width={18} alt="Atenção" />
            {statusMessage}
          </span>
        )}
      </StatusContainer>
      <SubmitButton validation={validation}>Registrar</SubmitButton>
    </MainForm>
  );
}

export default RegistrationForm;
