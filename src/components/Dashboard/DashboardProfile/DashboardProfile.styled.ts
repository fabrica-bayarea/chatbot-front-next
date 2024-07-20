import styled from 'styled-components';

import { DarshboardCard } from '@/components/styled';

export const AvatarContainer = styled.div`
  /* align-items: center; */
  display: flex;
  /* flex-grow: 10; */
  justify-content: space-evenly;
  position: relative;
  top: -40px;
  width: 100%;
`;

export const Container = styled(DarshboardCard)`
  grid-area: Card;
  grid-template-rows: 10px auto;
`;

export const Header = styled.div`
  background-color: var(--clr-b);
  background-image: linear-gradient(
    to bottom right,
    rgba(255 255 255 / 20%),
    rgba(255 255 255 / 0%) 50%
  );
  border-radius: 8px 8px 0 0;
  height: 80px;
  width: 100%;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  top: 200px;

  & > span:first-child {
    font-size: 2rem;
    left: -2px;
    position: relative;
  }
`;
