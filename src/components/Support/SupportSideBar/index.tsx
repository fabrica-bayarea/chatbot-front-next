'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  Container,
  Header,
  List,
  ListItem,
  OpenCloseContainer,
  Status,
} from './SupportSideBar.styled';

import { signOut } from '@/actions/auth';
import { Avatar, IconButton } from '@/components/styled';
import { useMainContext, useSupportList } from '@/hooks';
import elapsedTime from '@/utils/elapsedTime';

function SupportList() {
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
            onClick={() => router.push(`/suporte/${id}`)}
            role="button"
            tabIndex={0}
          >
            <Avatar $fontSize="1.25rem" $picture={owner_profile?.picture} $width="40px">
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

function SupportSideBar() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  return (
    <Container $isVisible={isVisible}>
      <Header>
        <nav>
          <IconButton onClick={() => router.push('/')}>
            <Image
              src="/home-white.svg"
              height={18}
              width={18}
              alt="Link para a página principal"
            />
          </IconButton>
          <IconButton onClick={() => router.push('/suporte')}>
            <Image
              src="/bar_chart-white.svg"
              height={18}
              width={18}
              alt="Link para o painel"
            />
          </IconButton>
          <IconButton onClick={() => signOut()}>
            <Image src="/logout-white.svg" height={18} width={18} alt="Logout" />
          </IconButton>
        </nav>
      </Header>
      <h1>Atendimentos</h1>
      <SupportList />
      <OpenCloseContainer>
        <IconButton onClick={() => setIsVisible(!isVisible)}>
          <Image
            src="/menu_open-white.svg"
            height={24}
            width={24}
            alt="Alternar menu lateral"
          />
        </IconButton>
      </OpenCloseContainer>
    </Container>
  );
}

export default SupportSideBar;
