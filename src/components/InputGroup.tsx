'use client';

import PasswordInput from './PasswordInput';
import { MainInput, Label } from './styled';
import type { InputGroupProps } from '@/types';

function InputGroup({ name, scheme, type, ...attributes }: InputGroupProps) {
  // Render functions
  const renderInput = () => {
    if (type === 'password') {
      return <PasswordInput name={name} value={scheme.value} {...attributes} />;
    } else {
      return (
        <MainInput
          type={type}
          id={`${name}-input`}
          name={name}
          value={scheme.value}
          {...attributes}
        />
      );
    }
  };

  // Main render
  return (
    <Label htmlFor={`${name}-input`}>
      <span>
        {scheme.label}
        {scheme.isRequired && ' *'}
      </span>
      {renderInput()}
    </Label>
  );
}

export default InputGroup;
