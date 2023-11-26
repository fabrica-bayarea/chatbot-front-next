'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { DropdownButton, IconButton } from './styled';
import { useChatContext, useMainContext } from '@/hooks';
import { logout } from '@/app/actions';

const Container = styled.div`
  position: relative;
`;

const ToggleButton = styled(IconButton)`
  color: var(--clr-light);
  font-size: 2em;
  position: relative;
  z-index: 100;
`;

const Navigation = styled.nav<{ $visibility: boolean }>`
  border: 1px solid var(--clr-d);
  box-shadow: 0 0 2px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 30px;
  transition: opacity 400ms ease, top 400ms ease, visibility 400ms ease;
  visibility: hidden;
  width: 180px;
  z-index: 10;

  ${(props) =>
    props.$visibility &&
    css`
      opacity: 1;
      top: 50px;
      visibility: visible;
    `}
`;

function Dropdown({ showFn }: { showFn: Dispatch<SetStateAction<boolean>> }) {
  const { changeConversation } = useChatContext();
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
      <ToggleButton type="button" onClick={() => setIsVisible(!isVisible)}>
        <Image
          src={isVisible ? '/xmark-white.svg' : '/bars-white.svg'}
          height={30}
          width={30}
          alt="Menu icon"
        />
      </ToggleButton>
      <Navigation $visibility={isVisible}>
        <DropdownButton
          type="button"
          onClick={() => {
            changeConversation('', []);
            showFn(false);
          }}
        >
          Nova conversa
        </DropdownButton>
        <DropdownButton
          type="button"
          onClick={() => {
            showFn(true);
          }}
        >
          Histórico
        </DropdownButton>
        <DropdownButton type="button" onClick={() => logout()}>
          Sair
        </DropdownButton>
      </Navigation>
    </Container>
  );
}

export default Dropdown;
