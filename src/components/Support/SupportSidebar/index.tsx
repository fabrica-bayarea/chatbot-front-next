'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type Dispatch, type SetStateAction, useRef, useState } from 'react';

import {
  Container,
  List,
  ListItem,
  OpenCloseContainer,
  Status,
} from './SupportSidebar.styled';

import { Avatar, IconButton } from '@/components/styled';
import { useOutsideClick, useSupportList } from '@/hooks';
import elapsedTime from '@/utils/elapsedTime';

function SupportList({
  setIsVisible,
}: {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { supportList } = useSupportList();

  if (supportList === undefined) {
    return <List>Loading</List>;
  }

  if (supportList?.length === 0) {
    return <List>Não há nada aqui!</List>;
  }

  return (
    <List>
      {supportList?.map(({ id, status, owner_profile, created_at }, index) => {
        return (
          <ListItem
            key={index}
            onClick={() => {
              setIsVisible(false);
              router.push(`/suporte/${id}`);
            }}
            role="button"
            tabIndex={0}
          >
            <Avatar $picture={owner_profile?.picture} $width="40px">
              {owner_profile?.name.charAt(0)}
            </Avatar>
            <div>
              <div>{owner_profile?.name.split(' ')[0]}</div>
              <span>{elapsedTime(created_at)}</span>
            </div>
            <Status $status={status} />
          </ListItem>
        );
      })}
    </List>
  );
}

function SupportSidebar() {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useOutsideClick(sidebarRef, () => setIsVisible(false));

  return (
    <div ref={sidebarRef}>
      <OpenCloseContainer>
        <IconButton onMouseDown={() => setIsVisible(!isVisible)}>
          <Image
            src={isVisible ? '/xmark-white.svg' : '/bars-white.svg'}
            height={24}
            width={24}
            alt="Alternar menu lateral"
          />
        </IconButton>
      </OpenCloseContainer>
      <Container $isVisible={isVisible}>
        <h1>Atendimentos</h1>
        <SupportList setIsVisible={setIsVisible} />
        <footer>
          <Image
            src="/iesb_logo.png"
            height={75}
            width={75}
            quality={100}
            alt="Logo IESB"
            style={{ border: '1px solid white', boxSizing: 'content-box' }}
          />
        </footer>
      </Container>
    </div>
  );
}

export default SupportSidebar;
