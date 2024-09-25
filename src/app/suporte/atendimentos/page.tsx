'use client';

import styled from 'styled-components';

import {
  ClosedSupportChart,
  GeneralComparisonChart,
  StatusUpdateChart,
} from '@/components/Dashboard/Charts';

import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import DashboardProfile from '@/components/Dashboard/DashboardProfile';
import { AnalyticsProvider } from '@/context';
import { mediaQueries } from '@/utils/mediaQueries';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 50px);
  overflow-y: scroll;
  padding: 80px 15% 0;
  width: 100%;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }

  ${mediaQueries.laptopL} {
    padding: 80px 10% 0;
  }

  ${mediaQueries.laptopM} {
    padding: 80px 5% 0;
  }
`;

const Content = styled.section`
  display: grid;
  gap: 20px;
  grid-template:
    'Card ClosedSupportChart' minmax(auto, auto)
    'GeneralComparisonChart GeneralComparisonChart' minmax(auto, auto)
    'StatusUpdateChart StatusUpdateChart' minmax(auto, auto)
    'CallDuration CallDuration' minmax(auto, auto)
    / 1.4fr 1fr;
  margin: 60px 0;
  width: 100%;

  ${mediaQueries.laptopM} {
    gap: 10px;
  }

  ${mediaQueries.tablet} {
    grid-template:
      'Card'
      'ClosedSupportChart'
      'GeneralComparisonChart'
      'StatusUpdateChart'
      'CallDuration'
      / 100%;
    padding: 0 40px;
  }

  ${mediaQueries.mobileL} {
    padding: 0;
  }
`;

function Support() {
  return (
    <AnalyticsProvider>
      <Container>
        <DashboardHeader />
        <Content>
          <DashboardProfile />
          <ClosedSupportChart />
          <GeneralComparisonChart />
          <StatusUpdateChart />
        </Content>
      </Container>
    </AnalyticsProvider>
  );
}

export default Support;
