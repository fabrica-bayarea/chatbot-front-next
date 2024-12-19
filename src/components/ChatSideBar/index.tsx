'use client';

import Image from 'next/image';
import { type Dispatch, type SetStateAction, useRef, useState } from 'react';

import {
  Container,
  List,
  ListItem,
  LoadingItem,
  OpenCloseContainer,
} from './ChatSideBar.styled';

import { deleteConversation } from '@/actions/conversations';
import { deleteNotifications } from '@/actions/notifications';
import { TrashButton } from '@/components/Buttons';

import {
  ActionButton,
  DialogButton,
  IconButton,
  Notification,
} from '@/components/styled';

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

function History({ setIsVisible }: { setIsVisible: Dispatch<SetStateAction<boolean>> }) {
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
            setIsVisible(false);
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
              setIsVisible(false);
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

function ChatSideBar() {
  const { newConversation, setConversation } = useChatContext();
  const { user } = useMainContext();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useOutsideClick(sidebarRef, () => setIsVisible(false));

  return (
    <div ref={sidebarRef}>
      <OpenCloseContainer>
        <IconButton onMouseDown={() => setIsVisible(!isVisible)} $width="30px">
          <Image
            src={isVisible ? '/xmark.svg' : '/bars-white.svg'}
            height={24}
            width={24}
            alt="Alternar menu lateral"
          />
        </IconButton>
      </OpenCloseContainer>
      <Container $isVisible={isVisible}>
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
          <History setIsVisible={setIsVisible} />
          <footer>
            <ActionButton
              onClick={() => {
                setConversation(newConversation);
                setIsVisible(false);
              }}
              disabled={!user}
            >
              +
            </ActionButton>
          </footer>
        </div>
      </Container>
    </div>
  );
}

export default ChatSideBar;
