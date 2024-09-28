import Image from 'next/image';
import Link from 'next/link';

import { Container, Conversation } from '../Chat.styled';
import { MessageContainer } from './UnauthChat.styled';
import { signInAnonymously } from '@/actions/auth';
import ChatMessage from '@/components/ChatMessage';
import { MessageButton } from '@/components/styled';

function UnauthChat() {
  return (
    <Container>
      <Conversation $open={true}>
        <div>
          <Image
            src="/eda.png"
            height={135}
            width={105}
            quality={100}
            alt="Ilustração da Eda"
          />
          <ChatMessage role={'assistant'}>
            <MessageContainer>
              <div>
                Olá! Eu sou a <strong>Eda</strong>, assistente virtual do IESB, e estou
                aqui para lhe ajudar!
                <br />
                <br />
                Para dar continuidade, vou precisar de algumas informações.
                <br />
                Você pode fazer o <Link href="/login">login</Link> agora, ou fornecê-las
                mais tarde.
              </div>
              <div>
                <MessageButton onClick={() => signInAnonymously()}>
                  Continuar
                </MessageButton>
              </div>
            </MessageContainer>
          </ChatMessage>
        </div>
      </Conversation>
    </Container>
  );
}

export default UnauthChat;
