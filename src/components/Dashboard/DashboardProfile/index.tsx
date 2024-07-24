'use client';

import {
  AvatarContainer,
  Container,
  RatingContainer,
  UserContainer,
} from './DashboardProfile.styled';

import { Avatar } from '@/components/styled';
import Rating from '@/components/styled/Rating.styled';
import { useMainContext } from '@/hooks';

function DashboardProfile() {
  const { user } = useMainContext();

  return (
    <Container>
      <AvatarContainer>
        <Avatar $fontSize="2.5em" $picture={user.picture} $width="3.75em">
          {user.name.charAt(0)}
        </Avatar>
        <UserContainer>
          <span>{user.name}</span>
          <span>{user.email}</span>
        </UserContainer>
      </AvatarContainer>
      <RatingContainer>
        <span>Média das avaliações:</span>
        <span>
          <b>4.5</b> / 5
        </span>
        <Rating $rating={4.5} />
      </RatingContainer>
    </Container>
  );
}

export default DashboardProfile;
