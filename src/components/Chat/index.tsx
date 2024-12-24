'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import Feedback from './Feedback';
import SupportStatus from './SupportStatus';
import { Container, Conversation as StyledConversation, Loading } from './Chat.styled';
import ChatMessage from '@/components/ChatMessage';
import { ChatForm } from '@/components/Forms';
import { useMessages } from '@/hooks';
import type { Conversation } from '@/utils/definitions';

function Chat({ conversation }: { conversation: Conversation | null | undefined}) {
  const { getStream, isLoading, isStreaming, messages, sendMessage } =
    useMessages(conversation);

  const pathname = usePathname();
  const conversationRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [showFeedback, setShowFeedback] = useState(false);

  const conversationStatus = conversation?.status;
  const conversationLength = messages?.length;
  const support = conversation?.support_details;

  const formAction = support
    ? (content: string) => sendMessage(content, 'user')
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
  // useEffect(() => {
  //   setShowFeedback(
  //     conversationStatus === 'open' &&
  //       conversationLength % 2 === 0 &&
  //       conversationLength !== 0 &&
  //       !isLoading
  //   );
  // }, [conversation?.status, conversationLength, isLoading]);

  return (
    <Container>
      <SupportStatus support={support} />
      <StyledConversation ref={conversationRef}>
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
        {messages?.map(({ content, role, owner_profile }, index) => {
          return (
            <ChatMessage key={index} role={role} ownerProfile={owner_profile}>
              {content}
            </ChatMessage>
          );
        })}
        {/* {showFeedback && <Feedback id={messages[conversationLength - 1]?.id as string} />} */}
        <Loading>
          {(isLoading || isStreaming) && <BeatLoader color="lightgray" size={8} />}
        </Loading>
      </StyledConversation>
      <ChatForm
        action={formAction}
        background={true}
        maxHeight={120}
        disabled={
          conversationStatus === 'redirected' &&
          (!support || support.status !== 'accepted')
        }
      />
    </Container>
  );
}

export default Chat;
