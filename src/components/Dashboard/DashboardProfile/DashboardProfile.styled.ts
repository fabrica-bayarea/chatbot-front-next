import styled from 'styled-components';

import { Avatar, DashboardCard } from '@/components/styled';
import { mediaQueries } from '@/utils/mediaQueries';

export const AvatarContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
  width: 100%;

  ${mediaQueries.laptopM} {
    font-size: 14px;
  }

  ${mediaQueries.tablet} {
    flex-direction: column;
    font-size: 16px;
    gap: 20px;
  }

  ${mediaQueries.mobileM} {
    font-size: 14px;
  }
`;

export const Container = styled(DashboardCard)`
  align-items: center;
  border-top: 32px solid var(--clr-b);
  grid-area: Card;
  justify-content: space-evenly;
  padding: 10px;

  ${mediaQueries.tablet} {
    gap: 40px;
    padding: 20px 10px;
  }
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
    font-size: 1.75em;
  }

  & > span:nth-child(2) {
    font-size: 0.9em;
  }

  ${mediaQueries.tablet} {
    & > span:first-child {
      text-align: center;
    }
  }
`;
