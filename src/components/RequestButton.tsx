'use client';

import { useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import { AltButton } from './styled';
import { RequestButtonProps } from '@/lib/definitions';

function RequestButton({ children, disabled, request }: RequestButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await request();
    setIsLoading(false);
  };

  return (
    <AltButton onClick={handleClick} disabled={disabled || isLoading}>
      {isLoading ? <BeatLoader color="white" size={8} /> : children}
    </AltButton>
  );
}

export default RequestButton;
