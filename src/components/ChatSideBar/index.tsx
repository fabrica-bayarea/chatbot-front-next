'use client';

import Image from 'next/image';
import { type Dispatch, type SetStateAction, useRef } from 'react';

import {
  Container,
  ItemDetails,
  List,
  ListItem,
  LoadingItem,
} from './ChatSideBar.styled';

import { deleteConversation } from '@/actions/conversations';
import { TrashButton } from '@/components/Buttons';
import { DialogButton, DialogLink, SendButton } from '@/components/styled';
import { Skeleton, SkeletonContainer } from '@/components/styled/Skeleton.styled';
import { useChatContext, useHistory, useMainContext, useOutsideClick } from '@/hooks';

function Loading({ n }: { n: number }) {
  return (
    <List>
      {new Array(n).fill(0).map((_, i) => {
        return (
          <LoadingItem key={i}>
            <SkeletonContainer $gap="15px">
              <SkeletonContainer $gap="5px">
                <Skeleton $height="15px" $width="120px" />
                <Skeleton $height="10px" $width="80px" />
              </SkeletonContainer>
              <Skeleton $height="20px" $width="200px" />
            </SkeletonContainer>
          </LoadingItem>
        );
      })}
    </List>
  );
}

function History({ showFn }: { showFn: Dispatch<SetStateAction<boolean>> }) {
  const { newConversation, setConversation } = useChatContext();
  const { user } = useMainContext();
  const { history } = useHistory();

  if (!user) {
    return (
      <DialogLink href="/login" $width="150px">
        Login
      </DialogLink>
    );
  }

  if (history === undefined) {
    return <Loading n={3} />;
  }

  if (history?.length === 0) {
    return (
      <List>
        <span>Não há nada aqui!</span>
        <DialogButton
          onClick={() => {
            setConversation(newConversation);
            showFn(false);
          }}
          $width="150px"
        >
          Nova conversa
        </DialogButton>
      </List>
    );
  }

  return (
    <List>
      {history?.map((conversation) => {
        const { id, messages } = conversation;
        const firstTime = new Date(messages[0].created_at).toLocaleString('pt-BR');

        return (
          <ListItem
            key={id}
            onClick={() => {
              setConversation(conversation);
              showFn(false);
            }}
            role="button"
            tabIndex={0}
          >
            <ItemDetails>
              <span>{firstTime}</span>
              <span>({messages.length} mensagens)</span>
              <span>{messages[0].content}</span>
            </ItemDetails>
            <TrashButton handleClick={() => deleteConversation(id)} />
          </ListItem>
        );
      })}
    </List>
  );
}

function ChatSideBar({
  isVisible,
  showFn,
}: {
  isVisible: boolean;
  showFn: Dispatch<SetStateAction<boolean>>;
}) {
  const { newConversation, setConversation } = useChatContext();
  const { user } = useMainContext();
  const sidebarRef = useRef<HTMLElement | null>(null);

  useOutsideClick(sidebarRef, () => showFn(false));

  return (
    <Container ref={sidebarRef} $isVisible={isVisible}>
      <div>
        <header>
          <h1>chatbot</h1>
          <Image
            src="/iesb-logo.png"
            height={60}
            width={60}
            quality={100}
            alt="Logo IESB"
          />
        </header>
        <History showFn={showFn} />
        <footer>
          <SendButton
            onClick={() => {
              setConversation(newConversation);
              showFn(false);
            }}
            disabled={!user}
          >
            +
          </SendButton>
        </footer>
      </div>
    </Container>
  );
}

export default ChatSideBar;
