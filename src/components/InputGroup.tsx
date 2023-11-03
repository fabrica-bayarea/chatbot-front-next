import PasswordInput from './PasswordInput';
import { MainInput, Label } from './styled';
import type { InputGroupProps } from '@/types';

function InputGroup({ label, name, type = 'text', ...attributes }: InputGroupProps) {
  // Render functions
  const renderInput = () => {
    if (type === 'password') {
      return <PasswordInput name={name} {...attributes} />;
    } else {
      return <MainInput type={type} id={`${name}-input`} name={name} {...attributes} />;
    }
  };

  // Main render
  return (
    <Label htmlFor={`${name}-input`}>
      <span>{label}</span>
      {renderInput()}
    </Label>
  );
}

export default InputGroup;
