'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { type Dispatch, type SetStateAction, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
  const { history } = useHistory();
  const { user } = useMainContext();
  const pathname = usePathname();
  const router = useRouter();

  const slugs = pathname.split('/').filter(Boolean);
  const conversationId = slugs.length > 1 ? slugs[1] : null;

  const { notifications, setNotifications } = useNotifications(conversationId);

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
            setIsVisible(false);
            router.push(`/novo/${uuidv4()}`);
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
              setIsVisible(false);

              if (conversationNotifications.length > 0) {
                deleteNotifications(conversationNotifications);
                setNotifications((draft) =>
                  draft.filter((e) => e.conversation_id !== id)
                );
              }

              router.push(`/chat/${id}`);
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
                  if (id === conversationId) {
                    router.push(`/novo/${uuidv4()}`);
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
  const { user } = useMainContext();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
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
                setIsVisible(false);
                router.push(`/novo/${uuidv4()}`);
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
