import styled from 'styled-components';

import { DarshboardCard } from '@/components/styled';

export const Container = styled(DarshboardCard)`
  grid-area: GeneralComparisonGraphic;
  height: 520px;

  & > div {
    padding: 0 80px;
  }
`;
