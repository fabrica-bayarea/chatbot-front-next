'use client';

import { type Dispatch, type SetStateAction, useRef, useState } from 'react';

import { Container, Navigation } from './Dropdown.styled';
import { signOut } from '@/actions/auth';
import { Avatar, DropdownButton } from '@/components/styled';
import { useMainContext, useOutsideClick } from '@/hooks';

function Dropdown({ showFn }: { showFn: Dispatch<SetStateAction<boolean>> }) {
  const { user } = useMainContext();
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useOutsideClick(navRef, () => setIsVisible(false), true);

  return (
    <Container ref={navRef}>
      <button onMouseDown={() => setIsVisible(!isVisible)}>
        <Avatar $border={true} $fontSize="0.9rem" $picture={user?.picture} $width="40px">
          {user?.name?.charAt(0)}
        </Avatar>
      </button>
      <Navigation $isVisible={isVisible}>
        {user.role !== 'user' && (
          <DropdownButton as="a" href="/suporte/atendimentos">
            Atendimentos
          </DropdownButton>
        )}
        <DropdownButton as="a" href="/perfil">
          Perfil
        </DropdownButton>
        <DropdownButton as="a" href="/suporte/privacidade" target="_blank">
          Política de Privacidade
        </DropdownButton>
        <DropdownButton onClick={() => signOut()}>Sair</DropdownButton>
      </Navigation>
    </Container>
  );
}

export default Dropdown;
