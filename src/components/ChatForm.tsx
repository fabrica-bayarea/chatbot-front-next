'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { type FormEvent, useRef } from 'react';
import styled from 'styled-components';

import { ChatInput, Form, IconButton } from './styled';
import { useChatContext, useMainContext } from '@/hooks';

const SendButton = styled(IconButton)`
  bottom: 60px;
  height: 60px;
  position: absolute;
  right: -30px;
`;

function ChatForm() {
  const { getReply } = useChatContext();
  const { isLoading } = useMainContext();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (pathname === '/chat') {
  }

  // Request an AI response to update the conversation
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const inputElement = inputRef.current as HTMLInputElement;
    const content = inputElement.value;

    if (!content || isLoading) {
      return;
    }

    inputElement.value = '';

    if (pathname === '/chat') {
      console.log('TODO');
    } else if (pathname.startsWith('/chat')) {
      await getReply(content);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ChatInput type="text" ref={inputRef} placeholder="Digite uma mensagem..." />
      <SendButton type="submit" $bgColor="var(--clr-d)">
        <Image src="/paper_plane-white.svg" height={24} width={24} alt="Send icon" />
      </SendButton>
    </Form>
  );
}

export default ChatForm;
