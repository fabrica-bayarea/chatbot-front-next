'use client';

import Image from 'next/image';
import { type Dispatch, type SetStateAction, useRef, useState } from 'react';

import { Container, DropdownButton, Navigation } from './Dropdown.styled';
import { signOut } from '@/actions/auth';
import { IconButton } from '@/components/styled';
import { useChatContext, useMainContext, useOutsideClick } from '@/hooks';
import { useRouter } from 'next/navigation';

function Dropdown({ showFn }: { showFn: Dispatch<SetStateAction<boolean>> }) {
  const { user } = useMainContext();
  const { newConversation, setConversation } = useChatContext();
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useOutsideClick(navRef, () => setIsVisible(false), true);

  return (
    <Container ref={navRef}>
      <IconButton onMouseDown={() => setIsVisible(!isVisible)}>
        <Image
          src={isVisible ? '/xmark-white.svg' : '/bars-white.svg'}
          height={30}
          width={30}
          alt="Alternar visibilidade"
        />
      </IconButton>
      <Navigation $isVisible={isVisible}>
        {user.role !== 'user' && (
          <DropdownButton onClick={() => router.push('/suporte/atendimentos')}>
            Atendimentos
          </DropdownButton>
        )}
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
