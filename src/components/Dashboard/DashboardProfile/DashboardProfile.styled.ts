import styled from 'styled-components';

import { Avatar, DashboardCard } from '@/components/styled';

export const AvatarContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export const Container = styled(DashboardCard)`
  align-items: center;
  border-top: 32px solid var(--clr-b);
  grid-area: Card;
  grid-template-rows: 10px auto;
  justify-content: space-evenly;
`;

export const ProfileAvatar = styled(Avatar)`
  filter: grayscale(50%);
`;

export const RatingContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  width: fit-content;

  & > span {
    & > b {
      font-size: 3.25rem;
    }
  }
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > span:first-child {
    font-size: 2.5rem;
    left: -3px;
    position: relative;
  }

  & > span:nth-child(2) {
    font-size: 0.9rem;
  }
`;
