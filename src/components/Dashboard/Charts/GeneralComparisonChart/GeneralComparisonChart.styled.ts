import styled from 'styled-components';

import { DashboardCard } from '@/components/styled';

export const ChartContainer = styled.div`
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-a);
  }

  & > div {
    min-width: 480px;
  }
`;

export const Container = styled(DashboardCard)`
  grid-area: GeneralComparisonChart;
  padding: 0 80px;

  @media screen and (width <= 1440px) {
    padding: 0 40px;
  }

  @media screen and (width <= 1280px) {
    padding: 0 20px;
  }
`;
