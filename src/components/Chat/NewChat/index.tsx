'use client';

import Image from 'next/image';

import { Container, Conversation } from '../Chat.styled';
import ChatMessage from '@/components/ChatMessage';
import { ChatForm } from '@/components/Forms';

function NewChat() {

  return (
    <Container>
      <Conversation>
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
      </Conversation>
      <ChatForm
        action={() => {}}
        background={true}
        maxHeight={120}
      />
    </Container>
  );
}

export default NewChat;
