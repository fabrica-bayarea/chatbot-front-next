'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import { IconButton } from './styled';
import { useChatContext } from '@/hooks';

const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  min-width: 90px;
`;

function TrashButton({ id }: { id: string }) {
  const { deleteConversation } = useChatContext();
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (showConfirmation) {
    return (
      <Container>
        <IconButton
          onClick={async (event) => {
            event.stopPropagation();
            await deleteConversation(id);
          }}
          $hover={true}
        >
          <Image src="/check.svg" height={20} width={20} alt="Confirm icon" />
        </IconButton>
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            setShowConfirmation(false);
          }}
          $hover={true}
        >
          <Image src="/xmark.svg" height={20} width={20} alt="Cancel icon" />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          setShowConfirmation(true);
        }}
        $hover={true}
      >
        <Image src="/trash.svg" height={16} width={16} alt="Trash icon" />
      </IconButton>
    </Container>
  );
}

export default TrashButton;
