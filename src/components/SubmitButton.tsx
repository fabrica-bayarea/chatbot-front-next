'use client';

import { useFormStatus } from 'react-dom';
import BeatLoader from 'react-spinners/BeatLoader';

import { MainButton } from './styled';
import type { ValidationType } from '@/types';

function SubmitButton({ validation }: { validation: ValidationType }) {
  const { pending } = useFormStatus();

  return (
    <MainButton type="submit" disabled={pending || validation !== true}>
      {pending ? <BeatLoader color="red" size={8} /> : 'Entrar'}
    </MainButton>
  );
}

export default SubmitButton;
