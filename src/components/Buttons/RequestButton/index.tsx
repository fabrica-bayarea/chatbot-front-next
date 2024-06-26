'use client';

import { type ReactNode, useState } from 'react';
import { ClipLoader } from 'react-spinners';

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
      {children}
      {isLoading && (
        <div>
          <ClipLoader color="white" size={12} />
        </div>
      )}
    </AltButton>
  );
}

export default RequestButton;
