'use client';

import Image from 'next/image';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import { Container, Navigation, ToggleButton } from './Dropdown.styled';
import { signOut } from '@/actions/auth';
import { DropdownButton } from '@/components/styled';
import { useChatContext } from '@/hooks';

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
