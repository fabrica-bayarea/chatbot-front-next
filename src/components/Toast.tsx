'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { IconButton } from './styled';
import { useMainContext } from '@/hooks';

const DELAY = 2000;

const Container = styled.div<{ $visible: boolean }>`
  background-color: var(--clr-c);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  left: calc(50% - 160px);
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  position: absolute;
  top: ${({ $visible }) => ($visible ? '10px' : '-80px')};
  transition: opacity 500ms ease, top 500ms ease;
  width: 320px;
  z-index: 10;

  & > button {
    position: absolute;
    right: 0;
    top: 0;
  }

  & > div {
    animation: ${({ $visible }) => ($visible ? `timeout ${DELAY}ms linear` : 'none')};
    background-color: var(--clr-a);
    height: 4px;
    width: 0;
  }

  & > span {
    align-items: center;
    color: var(--clr-light);
    display: flex;
    height: 56px;
    justify-content: center;
  }
`;

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
    <Container $visible={showMessage}>
      <div></div>
      <span>{message}</span>
      <IconButton onClick={() => setShowMessage(false)} $hover={true}>
        <Image src="/xmark-white.svg" height={16} width={16} alt="Close icon" />
      </IconButton>
    </Container>
  );
}

export default Toast;
