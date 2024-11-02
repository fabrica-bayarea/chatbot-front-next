'use client';

import Image from 'next/image';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import Feedback from './Feedback';
import { Container, Conversation, Loading } from './Chat.styled';
import ChatMessage from '@/components/ChatMessage';
import { ChatForm } from '@/components/Forms';
import { useChatContext, useMainContext } from '@/hooks';

function Chat() {
  const { isLoading } = useMainContext();
  const { conversation, isStreaming, getStream, sendMessage } = useChatContext();
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const messages = conversation?.messages;
  const conversationLength = messages?.length;
  const support = conversation?.support_details;

  const formAction = support
    ? (content: string) => sendMessage(content)
    : (content: string) => getStream(content);

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
      conversation?.status === 'open' &&
        conversationLength % 2 === 0 &&
        conversationLength !== 0 &&
        !isStreaming
    );
  }, [conversation?.status, conversationLength, isStreaming]);

  return (
    <Container>
      <Conversation ref={conversationRef}>
        <div>
          <Image
            src="/eda.png"
            height={135}
            width={105}
            quality={100}
            alt="Ilustração da Eda"
          />
          <ChatMessage role={'assistant'}>
            Tudo pronto!
            <br />
            Como posso lhe ajudar hoje?
          </ChatMessage>
        </div>
        {conversation?.messages.map(({ content, role, owner_profile }, index) => {
          return (
            <ChatMessage key={index} role={role} ownerProfile={owner_profile}>
              {content}
            </ChatMessage>
          );
        })}
        {showFeedback && (
          <Feedback id={conversation?.messages[conversationLength - 1]?.id as string} />
        )}
        <Loading>{isLoading && <BeatLoader color="lightgray" size={8} />}</Loading>
      </Conversation>
      <ChatForm
        action={formAction}
        background={true}
        maxHeight={120}
        disabled={!!support && support.status !== 'accepted'}
      />
    </Container>
  );
}

export default Chat;
