'use client';

import { useFormStatus } from 'react-dom';
import BeatLoader from 'react-spinners/BeatLoader';

import { MainButton } from './styled';
import type { SubmitButtonProps } from '@/lib/definitions';

function SubmitButton({ children, validation }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <MainButton type="submit" disabled={pending || validation !== true}>
      {pending ? <BeatLoader color="red" size={8} /> : children}
    </MainButton>
  );
}

export default SubmitButton;
