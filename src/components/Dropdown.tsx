'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

import { DropdownButton, IconButton } from './styled';
import { signOut } from '@/actions/auth';
import { useChatContext } from '@/hooks';

const Container = styled.div`
  position: relative;
`;

const ToggleButton = styled(IconButton)`
  font-size: 2em;
  z-index: 100;
`;

const Navigation = styled.nav<{ $visible: boolean }>`
  border: 1px solid var(--clr-d);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  position: absolute;
  right: 0;
  top: ${({ $visible }) => ($visible ? '50px' : '30px')};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transition: opacity 400ms ease, top 400ms ease, visibility 400ms ease;
  width: 180px;
  z-index: 10;
`;

function Dropdown({ showFn }: { showFn: Dispatch<SetStateAction<boolean>> }) {
  const { newConversation, setConversation } = useChatContext();
  const [isVisible, setIsVisible] = useState(false);

  // Listen for click events to close the menu
  useEffect(() => {
    const handleOutsideClick = () => {
      if (isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isVisible]);

  return (
    <Container>
      <ToggleButton onClick={() => setIsVisible(!isVisible)}>
        <Image
          src={isVisible ? '/xmark-white.svg' : '/bars-white.svg'}
          height={30}
          width={30}
          alt="Menu icon"
        />
      </ToggleButton>
      <Navigation $visible={isVisible}>
        <DropdownButton
          onClick={() => {
            setConversation(newConversation);
            showFn(false);
          }}
        >
          Nova conversa
        </DropdownButton>
        <DropdownButton
          onClick={() => {
            showFn(true);
          }}
        >
          Histórico
        </DropdownButton>
        <DropdownButton onClick={() => signOut()}>Sair</DropdownButton>
      </Navigation>
    </Container>
  );
}

export default Dropdown;
