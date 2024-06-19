'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  Container,
  Footer,
  Header,
  List,
  ListItem,
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
  const { user: collaborator } = useMainContext();

  return (
    <Container>
      <Header>
        <Link href={'/'}>
          <Image
            src="/home.svg"
            height={24}
            width={24}
            alt="Link para a página principal"
          />
        </Link>
        <h1>Atendimentos</h1>
      </Header>
      <SupportList />
      <Footer>
        <div>
          <div>{collaborator?.name.split(' ')[0]}</div>
          <div>{collaborator?.email}</div>
        </div>
        <IconButton onClick={() => signOut()}>
          <Image src="/logout-white.svg" height={18} width={18} alt="Botão de deslogar" />
        </IconButton>
      </Footer>
    </Container>
  );
}

export default SupportSideBar;
