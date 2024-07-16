'use client';

import { useEffect } from 'react';
import styled from 'styled-components';

import { DialogButton } from '@/components/styled';

const Container = styled.div`
  align-items: center;
  background-color: white;
  border-radius: var(--r);
  display: flex;
  flex-direction: column;
  gap: 60px;
  height: 600px;
  justify-content: center;
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="error">
      <h2>Algo deu errado :(</h2>
      <DialogButton onClick={() => reset()} $width="200px">
        Tentar novamente
      </DialogButton>
    </Container>
  );
}
