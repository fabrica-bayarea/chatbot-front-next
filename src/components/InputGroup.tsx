'use client';

import { InputScheme } from '@/utils/definitions';
import PasswordInput from './PasswordInput';
import { MainInput, Label } from './styled';
import { ChangeEvent } from 'react';

function InputGroup({
  name,
  scheme,
  type,
  ...attributes
}: {
  name: string;
  scheme: InputScheme;
  type: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
}) {
  return (
    <Label htmlFor={`${name}-input`}>
      <span>
        {scheme.label}
        {scheme.isRequired && ' *'}
      </span>
      {type === 'password' ? (
        <PasswordInput name={name} value={scheme.value} {...attributes} />
      ) : (
        <MainInput
          type={type}
          id={`${name}-input`}
          name={name}
          value={scheme.value}
          {...attributes}
        />
      )}
    </Label>
  );
}

export default InputGroup;
