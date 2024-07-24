import styled from 'styled-components';

import { DashboardCard } from '@/components/styled';

export const Container = styled(DashboardCard)`
  grid-area: StatusUpdateChart;
  height: 520px;

  & > div {
    padding: 0 80px;
  }
`;
