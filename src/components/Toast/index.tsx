'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { Container } from './Toast.styled';
import { IconButton } from '@/components/styled';
import { useMainContext } from '@/hooks';

const DELAY = 2000;

function Toast() {
  const { message, setShowMessage, showMessage } = useMainContext();
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  //   Sets a timeout to hide the notification.
  //   A reference is required to do the cleanup correctly.
  useEffect(() => {
    if (showMessage) {
      timeoutRef.current = setTimeout(() => {
        setShowMessage(false);
      }, DELAY);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [setShowMessage, showMessage]);

  return (
    <Container $delay={DELAY} $visible={showMessage}>
      <div></div>
      <span>{message}</span>
      <IconButton onClick={() => setShowMessage(false)} $hover={true}>
        <Image src="/xmark.svg" height={16} width={16} alt="Fechar" />
      </IconButton>
    </Container>
  );
}

export default Toast;
