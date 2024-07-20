'use client';

import {
  AvatarContainer,
  Container,
  Header,
  UserContainer,
} from './DashboardProfile.styled';

import { Avatar } from '@/components/styled';
import { useMainContext } from '@/hooks';

function DashboardProfile() {
  const { user } = useMainContext();

  return (
    <Container>
      <Header />
      <AvatarContainer>
        <Avatar $fontSize="3.2rem" $picture={user.picture} $width="150px">
          {user.name.charAt(0)}
        </Avatar>
        <UserContainer>
          <span>{user.name}</span>
          <span>{user.email}</span>
        </UserContainer>
      </AvatarContainer>
    </Container>
  );
}

export default DashboardProfile;
