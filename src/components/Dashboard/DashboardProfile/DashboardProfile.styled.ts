import styled from 'styled-components';

import { Avatar, DashboardCard } from '@/components/styled';

export const AvatarContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
  width: 100%;

  @media screen and (width <= 1440px) {
    font-size: 14px;
  }

  @media screen and (width <= 768px) {
    flex-direction: column;
    font-size: 16px;
  }
`;

export const Container = styled(DashboardCard)`
  align-items: center;
  border-top: 32px solid var(--clr-b);
  grid-area: Card;
  justify-content: space-evenly;
  padding: 10px;

  @media screen and (width <= 1280px) {
    font-size: 14px;
  }

  @media screen and (width <= 768px) {
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
    font-size: 2rem;
    left: -3px;
    position: relative;
  }

  & > span:nth-child(2) {
    font-size: 0.9rem;
  }

  @media screen and (width <= 1280px) {
    gap: 4px;

    & > span:nth-child(2) {
      font-size: 0.9em;
    }
  }

  @media screen and (width <= 480px) {
    & > span:first-child {
      font-size: 1.5rem;
    }

    & > span:nth-child(2) {
      font-size: 0.8em;
    }
  }
`;
