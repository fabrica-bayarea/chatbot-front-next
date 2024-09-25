'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ButtonContainer } from './TrashButton.styled';
import { IconButton } from '@/components/styled';

function TrashButton({ handleClick }: { handleClick: () => Promise<void> }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (showConfirmation) {
    return (
      <ButtonContainer>
        <IconButton
          onClick={async (event) => {
            event.stopPropagation();
            await handleClick();
          }}
          $hover={true}
        >
          <Image src="/check.svg" height={24} width={24} alt="Confirmar" />
        </IconButton>
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            setShowConfirmation(false);
          }}
          $hover={true}
        >
          <Image src="/xmark.svg" height={24} width={24} alt="Cancelar" />
        </IconButton>
      </ButtonContainer>
    );
  }

  return (
    <ButtonContainer>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          setShowConfirmation(true);
        }}
        $hover={true}
      >
        <Image src="/trash.svg" height={24} width={24} alt="Apagar conversa" />
      </IconButton>
    </ButtonContainer>
  );
}

export default TrashButton;
