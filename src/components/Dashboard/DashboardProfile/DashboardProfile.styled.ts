import styled from 'styled-components';

import { DashboardCard } from '@/components/styled';

export const AvatarContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
`;

export const Container = styled(DashboardCard)`
  grid-area: Card;
  grid-template-rows: 10px auto;
  justify-content: space-evenly;
`;

export const RatingContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;

  & > span {
    & > b {
      font-size: 2.5rem;
    }
  }
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > span:first-child {
    font-size: 2rem;
    left: -2px;
    position: relative;
  }
`;
