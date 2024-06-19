'use client';

import { type ReactNode, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import { AltButton } from '@/components/styled';

function RequestButton({
  children,
  disabled,
  request,
}: {
  children: ReactNode;
  disabled?: boolean;
  request: () => Promise<any>;
}) {
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
