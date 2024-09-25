'use client';

import Image from 'next/image';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import Feedback from './Feedback';
import Suggestions from './Suggestions';
import { Container, Conversation, Loading } from './Chat.styled';
import ChatMessage from '@/components/ChatMessage';
import { ChatForm } from '@/components/Forms';
import { useChatContext, useMainContext } from '@/hooks';

function Chat() {
  const { isLoading, user } = useMainContext();
  const { conversation, getStream, isStreaming } = useChatContext();
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const conversationLength = conversation.messages.length;
  const isOpen = conversation.status === 'open';

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
          <Image
            src="/eda.png"
            height={135}
            width={105}
            quality={100}
            alt="Ilustração da Eda"
          />
          <ChatMessage role={'assistant'}>
            Eu sou <strong>Eda</strong>, assistente virtual do IESB.
            <br />
            Como posso lhe ajudar?
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
              possível, uma resposta será enviada para o e-mail:
            </p>
            <span>{user?.email}</span>
          </div>
        )}
        <Loading>{isLoading && <BeatLoader color="lightgray" size={8} />}</Loading>
      </Conversation>
      {isOpen && <ChatForm action={(content) => getStream(content)} maxHeight={120} />}
    </Container>
  );
}

export default Chat;
