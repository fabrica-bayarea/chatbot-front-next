'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';

import { Avatar, IconButton } from './styled';
import { signOut } from '@/app/actions';
import { useMainContext } from '@/hooks';
import type { ConversationStatus, SupportSideBarProps } from '@/lib/definitions';

const ElapsedTime = dynamic(() => import('./ElapsedTime'), {
  ssr: false,
  loading: () => <></>,
});

const Container = styled.aside`
  background-color: var(--clr-light);
  border-right: 1px solid var(--clr-a);
  box-shadow: 1px 0 4px 0 rgb(0 0 0 / 10%);
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 360px;

  & > a {
    aspect-ratio: 1;
    display: flex;
    left: 20px;
    position: absolute;
    top: 20px;
    width: 30px;
  }

  & > h1 {
    color: var(--clr-b);
    font-size: 2rem;
    height: 240px;
    line-height: 240px;
    text-align: center;
    text-transform: uppercase;
  }

  & > span {
    text-align: center;
  }
`;

const List = styled.ul`
  flex-grow: 10;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }
`;

const ListItem = styled.li`
  align-items: center;
  border-bottom: 1px solid var(--clr-light-gray);
  cursor: pointer;
  display: flex;
  gap: 10px;
  padding: 20px;
  transition: background-color ease-in 200ms;

  &:hover {
    background-color: var(--clr-light-gray);
  }

  & > div:nth-child(2) {
    flex-grow: 10;

    & > span {
      font-size: 0.75rem;
    }
  }
`;

const Status = styled.div<{ $status: ConversationStatus }>`
  aspect-ratio: 1;
  background-color: var(--clr-a);
  border-radius: 50%;
  opacity: 0.8;
  width: 20px;

  ${({ $status }) =>
    $status !== 'accepted' &&
    css`
      animation: pulse 1500ms infinite;
      background-color: var(--clr-b);
    `}
`;

const Footer = styled.footer`
  align-items: center;
  background-color: var(--clr-b);
  background-image: linear-gradient(
    to bottom right,
    rgba(255 255 255 / 20%) -20%,
    rgba(255 255 255 / 0%) 40%
  );
  border-top: 2px solid var(--clr-b);
  box-shadow: 0 -1px 4px 0 rgb(0 0 0 / 20%);
  color: var(--clr-light);
  display: flex;
  font-size: 0.9rem;
  height: 80px;
  justify-content: space-around;
`;

function SupportSideBar({ data }: SupportSideBarProps) {
  const { user: collaborator } = useMainContext();
  const router = useRouter();

  return (
    <Container>
      <Link href={'/'}>
        <Image src="/home.svg" height={24} width={24} alt="Home link" />
      </Link>
      <h1>Atendimentos</h1>
      {data.length === 0 && <span>Não há nada aqui!</span>}
      <List>
        {data.map(({ id, messages, status, user_profile }, index) => {
          const lastMessage = messages[messages.length - 1];

          return (
            <ListItem
              key={index}
              onClick={() => router.push(`/suporte/${id}`)}
              role="button"
              tabIndex={0}
            >
              <Avatar $fontSize="1.25rem" $imageUrl={user_profile?.picture} $width="40px">
                {user_profile?.name.charAt(0)}
              </Avatar>
              <div>
                <div>{user_profile?.name.split(' ')[0]}</div>
                <ElapsedTime time={lastMessage.time} />
              </div>
              <Status $status={status} />
            </ListItem>
          );
        })}
      </List>
      <Footer>
        <div>
          <div>{collaborator?.name.split(' ')[0]}</div>
          <div>{collaborator?.email}</div>
        </div>
        <IconButton onClick={() => signOut()}>
          <Image src="/logout-white.svg" height={18} width={18} alt="Logout icon" />
        </IconButton>
      </Footer>
    </Container>
  );
}

export default SupportSideBar;
