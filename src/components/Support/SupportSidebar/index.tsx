'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { type Dispatch, type SetStateAction, useRef, useState } from 'react';

import {
  Container,
  List,
  ListItem,
  LoadingItem,
  OpenCloseContainer,
} from './SupportSidebar.styled';

import { signOut } from '@/actions/auth';
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
  const pathname = usePathname();
  const router = useRouter();
  const { supportList } = useSupportList();

  const pathId = pathname.split('/').splice(-1)[0];

  if (supportList === undefined) {
    return <Loading n={5} />;
  }

  if (supportList?.length === 0) {
    return (
      <List>
        <span>Não há nada aqui!</span>
        <span>(｡♥‿♥｡)</span>
      </List>
    );
  }

  return (
    <List>
      {supportList?.map(({ id, status, owner_profile, created_at }, index) => {
        return (
          <ListItem
            className={pathId === id ? 'selected' : undefined}
            key={index}
            onClick={() => {
              setIsVisible(false);
              router.push(`/suporte/atendimentos/${id}`);
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
  const router = useRouter();
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
          <nav>
            <IconButton onClick={() => router.push('/')}>
              <Image
                src="/home-white.svg"
                height={18}
                width={18}
                alt="Página principal"
              />
            </IconButton>
            <IconButton
              onClick={() => {
                setIsVisible(false);
                router.push('/suporte/atendimentos');
              }}
            >
              <Image src="/bar_chart-white.svg" height={18} width={18} alt="Painel" />
            </IconButton>
            <IconButton onClick={() => signOut()}>
              <Image src="/logout-white.svg" height={18} width={18} alt="Logout" />
            </IconButton>
          </nav>
        </footer>
      </Container>
    </div>
  );
}

export default SupportSidebar;
