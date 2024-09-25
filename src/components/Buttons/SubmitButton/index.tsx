'use client';

import type { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import BeatLoader from 'react-spinners/BeatLoader';

import { MainButton } from '@/components/styled';

function SubmitButton({
  children,
  validation,
}: {
  children: ReactNode;
  validation: boolean | string;
}) {
  const { pending } = useFormStatus();

  return (
    <MainButton type="submit" disabled={pending || validation !== true}>
      {pending ? <BeatLoader color="red" size={8} /> : children}
    </MainButton>
  );
}

export default SubmitButton;
