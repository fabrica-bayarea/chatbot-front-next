'use client';

import { type Dispatch, type SetStateAction, useRef, useState } from 'react';

import { Container, DropdownButton, Navigation } from './Dropdown.styled';
import { signOut } from '@/actions/auth';
import { Avatar, IconButton } from '@/components/styled';
import { useChatContext, useMainContext, useOutsideClick } from '@/hooks';
import { useRouter } from 'next/navigation';

function Dropdown({ showFn }: { showFn: Dispatch<SetStateAction<boolean>> }) {
  const { user } = useMainContext();
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useOutsideClick(navRef, () => setIsVisible(false), true);

  return (
    <Container ref={navRef}>
      <IconButton onMouseDown={() => setIsVisible(!isVisible)}>
        <Avatar $border={true} $fontSize="0.9rem" $picture={user?.picture} $width="40px">
          {user?.name?.charAt(0)}
        </Avatar>
      </IconButton>
      <Navigation $isVisible={isVisible}>
        {user.role !== 'user' && (
          <DropdownButton onClick={() => router.push('/suporte/atendimentos')}>
            Atendimentos
          </DropdownButton>
        )}
        <DropdownButton>Perfil</DropdownButton>
        <DropdownButton onClick={() => router.push('/suporte/privacidade')}>
          Política de Privacidade
        </DropdownButton>
        <DropdownButton onClick={() => signOut()}>Sair</DropdownButton>
      </Navigation>
    </Container>
  );
}

export default Dropdown;
