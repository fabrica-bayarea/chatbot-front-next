'use client';

import Image from 'next/image';
import { type Dispatch, type SetStateAction, useRef } from 'react';

import { Container, List, ListItem, LoadingItem } from './ChatSideBar.styled';
import { deleteConversation } from '@/actions/conversations';
import { deleteNotifications } from '@/actions/notifications';
import { TrashButton } from '@/components/Buttons';
import { ActionButton, DialogButton, Notification } from '@/components/styled';
import { Skeleton, SkeletonContainer } from '@/components/styled/Skeleton.styled';

import {
  useChatContext,
  useHistory,
  useMainContext,
  useNotifications,
  useOutsideClick,
} from '@/hooks';

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
  const {
    conversation: contextConversation,
    newConversation,
    setConversation,
  } = useChatContext();

  const { user } = useMainContext();
  const { history } = useHistory();
  const { notifications, setNotifications } = useNotifications(contextConversation?.id);

  if (!user) {
    return (
      <DialogButton as="a" href="/login" $width="150px">
        Login
      </DialogButton>
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

        const conversationNotifications = notifications.filter(
          (e) => e.conversation_id === id
        );

        const newMessagesCount = conversationNotifications.length;

        return (
          <ListItem
            key={id}
            onClick={() => {
              setConversation(conversation);
              showFn(false);
              deleteNotifications(conversationNotifications);
              setNotifications((draft) => draft.filter((e) => e.conversation_id !== id));
            }}
            role="button"
            tabIndex={0}
          >
            <div>
              <span>{firstTime}</span>
              <Notification $count={newMessagesCount}>{newMessagesCount}</Notification>
            </div>
            <div>
              <span>{messages[0].content}</span>
              <TrashButton
                handleClick={() => {
                  if (id === contextConversation?.id) {
                    setConversation(newConversation);
                  }

                  return deleteConversation(id);
                }}
              />
            </div>
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
          <ActionButton
            onClick={() => {
              setConversation(newConversation);
              showFn(false);
            }}
            disabled={!user}
          >
            +
          </ActionButton>
        </footer>
      </div>
    </Container>
  );
}

export default ChatSideBar;
