import styled from 'styled-components';

import { DashboardCard } from '@/components/styled';
import { mediaQueries } from '@/utils/mediaQueries';

export const ChartContainer = styled.div`
  margin: 0 80px;
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

  ${mediaQueries.laptopL} {
    margin: 0 40px;
  }

  ${mediaQueries.laptopM} {
    margin: 0 20px;
  }
`;

export const Container = styled(DashboardCard)`
  grid-area: StatusUpdateChart;
`;
