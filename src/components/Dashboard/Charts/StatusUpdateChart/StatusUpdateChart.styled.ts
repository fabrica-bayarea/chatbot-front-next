import styled from 'styled-components';

import { DashboardCard } from '@/components/styled';
import { mediaQueries } from '@/utils/mediaQueries';

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
  grid-area: StatusUpdateChart;
  padding: 0 80px;

  ${mediaQueries.laptopL} {
    padding: 0 40px;
  }

  ${mediaQueries.laptopM} {
    padding: 0 20px;
  }
`;
