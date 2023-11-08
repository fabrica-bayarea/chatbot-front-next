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

  & > button {
    font-size: 1em;
    opacity: 0.25;
    transition: opacity 200ms ease;

    &:hover {
      opacity: 1;
    }
  }
`;

function TrashButton({ conversationId }: { conversationId: string }) {
  const { deleteConversation } = useChatContext();
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (showConfirmation) {
    return (
      <Container>
        <IconButton
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            deleteConversation({ id: conversationId });
          }}
        >
          <Image src="check.svg" height={20} width={20} alt="Check icon" />
        </IconButton>
        <IconButton
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setShowConfirmation(false);
          }}
        >
          <Image src="xmark.svg" height={20} width={20} alt="Cancel icon" />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container>
      <IconButton
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setShowConfirmation(true);
        }}
      >
        <Image src="trash.svg" height={16} width={16} alt="Trash icon" />
      </IconButton>
    </Container>
  );
}

export default TrashButton;
