'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type Dispatch, type SetStateAction, useRef, useState } from 'react';

import {
  Container,
  List,
  ListItem,
  LoadingItem,
  OpenCloseContainer,
} from './SupportSidebar.styled';

import { Avatar, LoadingAvatar, IconButton } from '@/components/styled';
import { Skeleton, SkeletonContainer } from '@/components/styled/Skeleton.styled';
import { LoadingStatus, Status } from '@/components/styled/Status.styled';
import { useOutsideClick, useSupportList } from '@/hooks';
import elapsedTime from '@/utils/elapsedTime';

function Loading({ n }: { n: number }) {
  return (
    <List>
      {new Array(n).fill(0).map((_, i) => {
        return (
          <LoadingItem key={i}>
            <LoadingAvatar $width="40px" />
            <SkeletonContainer $gap="5px">
              <Skeleton $height="20px" $width="140px" />
              <Skeleton $height="15px" $width="80px" />
            </SkeletonContainer>
            <LoadingStatus />
          </LoadingItem>
        );
      })}
    </List>
  );
}

function SupportList({
  setIsVisible,
}: {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { supportList } = useSupportList();

  if (supportList === undefined) {
    return <Loading n={5} />;
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
            <Avatar $border={true} $picture={owner_profile?.picture} $width="40px">
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
  const [isVisible, setIsVisible] = useState(false);

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
            height={60}
            width={60}
            quality={100}
            alt="Logo IESB"
            style={{ border: '2px solid white', boxSizing: 'content-box' }}
          />
        </footer>
      </Container>
    </div>
  );
}

export default SupportSidebar;
