'use client';

import Image from 'next/image';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import Feedback from './Feedback';
import Suggestions from './Suggestions';
import { Container, Conversation, Loading, SendButton } from './Chat.styled';
import ChatMessage from '@/components/ChatMessage';
import { Form, ChatInput } from '@/components/styled';
import { useChatContext, useMainContext } from '@/hooks';

function Chat() {
  const { user } = useMainContext();
  const { conversation, getStream, isStreaming } = useChatContext();
  const { isLoading } = useMainContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const conversationLength = conversation.messages.length;
  const isOpen = conversation.status === 'open';

  // Request an AI response to update the conversation
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const inputElement = inputRef.current as HTMLInputElement;
    const question = inputElement.value;

    if (!question || isLoading) {
      return;
    }

    inputElement.value = '';
    await getStream(question);
  };

  // Keeps the chat always scrolled down
  useEffect(() => {
    const conversationElement = conversationRef.current as HTMLDivElement;

    const ro = new ResizeObserver(() => {
      conversationElement.scrollTop = conversationElement.scrollHeight;
    });

    ro.observe(conversationElement);
  });

  // Shows feedback if the conversation is open and the last message is from the assistant
  useEffect(() => {
    setShowFeedback(
      conversation.status === 'open' &&
        conversationLength % 2 === 0 &&
        conversationLength !== 0 &&
        !isStreaming
    );
  }, [conversation.status, conversationLength, isStreaming]);

  return (
    <Container>
      <Conversation $open={isOpen} ref={conversationRef}>
        <div>
          <Image src="/eda.png" height={160} width={96} alt="Ilustração da Eda" />
          <ChatMessage role={'assistant'}>
            Eu sou <strong>Eda</strong>, assistente virtual do IESB.
            <br />
            Em que posso ajudar?
          </ChatMessage>
        </div>
        {conversation.messages.map(({ content, role, owner_profile }, index) => {
          return (
            <ChatMessage key={index} role={role} ownerProfile={owner_profile}>
              {content}
            </ChatMessage>
          );
        })}
        {conversationLength === 0 && <Suggestions />}
        {showFeedback && (
          <Feedback id={conversation.messages[conversationLength - 1]?.id as string} />
        )}
        {!isOpen && (
          <div className="redirect-status">
            <p>
              Esta conversa foi direcionada para nosso setor de suporte. Assim que
              possível uma resposta será enviada para o e-mail:
            </p>
            <span>{user?.email}</span>
          </div>
        )}
        <Loading>{isLoading && <BeatLoader color="lightgray" size={8} />}</Loading>
      </Conversation>
      {isOpen && (
        <Form onSubmit={handleSubmit}>
          <ChatInput type="text" ref={inputRef} placeholder="Digite uma mensagem..." />
          <SendButton type="submit">
            <Image src="/paper_plane-white.svg" height={24} width={24} alt="Send icon" />
          </SendButton>
        </Form>
      )}
    </Container>
  );
}

export default Chat;
