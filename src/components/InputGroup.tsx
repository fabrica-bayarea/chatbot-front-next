'use client';

import PasswordInput from './PasswordInput';
import { MainInput, Label } from './styled';
import type { InputGroupProps } from '@/lib/definitions';

function InputGroup({ name, scheme, type, ...attributes }: InputGroupProps) {
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
