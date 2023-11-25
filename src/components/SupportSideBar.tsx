'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { Avatar, IconButton } from './styled';
import type { SupportSideBarProps } from '@/types';

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
  min-height: 100vh;
  min-width: 360px;

  & > h1 {
    color: var(--clr-b);
    font-size: 2rem;
    height: 240px;
    line-height: 240px;
    text-align: center;
    text-transform: uppercase;
  }
`;

const List = styled.ul`
  flex-grow: 10;
`;

const ListItem = styled.li`
  align-items: center;
  border-bottom: 1px solid var(--clr-light-gray);
  cursor: pointer;
  display: flex;
  gap: 10px;
  padding: 20px;

  & > div:nth-child(2) {
    flex-grow: 10;

    & > span {
      font-size: 0.75rem;
    }
  }
`;

const Status = styled.div`
  aspect-ratio: 1;
  background-color: var(--clr-a);
  border-radius: 50%;
  width: 20px;
`;

const Footer = styled.footer`
  align-items: center;
  background-color: var(--clr-b);
  box-shadow: 0 -1px 4px 0 rgb(0 0 0 / 25%);
  color: var(--clr-light);
  display: flex;
  font-size: 0.9rem;
  height: 80px;
  justify-content: space-around;
`;

function SupportSideBar({ conversations }: SupportSideBarProps) {
  const router = useRouter();

  return (
    <Container>
      <h1>Atendimentos</h1>
      <List>
        {conversations
          .sort((a, b) => {
            const aLastMessage = a.messages[a.messages.length - 1];
            const bLastMessage = b.messages[b.messages.length - 1];

            return aLastMessage.time - bLastMessage.time;
          })
          .map(({ id, messages, user }, index) => {
            const lastMessage = messages[messages.length - 1];

            return (
              <ListItem
                key={index}
                onClick={() => router.push(`/suporte/${id}`)}
                role="button"
                tabIndex={0}
              >
                <Avatar $fontSize="1.25rem" $width="40px">
                  {user.name.charAt(0)}
                </Avatar>
                <div>
                  <div>{user.name}</div>
                  <ElapsedTime time={lastMessage.time} />
                </div>
                <Status />
              </ListItem>
            );
          })}
      </List>
      <Footer>
        <div>
          <div>Paulo Lima</div>
          <div>limapaulobsb@gmail.com</div>
        </div>
        <IconButton>
          <Image src="/logout-white.svg" height={18} width={18} alt="Logout icon" />
        </IconButton>
      </Footer>
    </Container>
  );
}

export default SupportSideBar;
