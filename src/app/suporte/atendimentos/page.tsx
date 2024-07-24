'use client';

import styled from 'styled-components';

import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import DashboardProfile from '@/components/Dashboard/DashboardProfile';
import * as Graphics from '@/components/Dashboard/Graphics';
import { AnalyticsProvider } from '@/context';

export const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 50px);
  overflow-y: scroll;
  padding-top: 80px;
  width: 100%;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }
`;

export const Content = styled.section`
  display: grid;
  gap: 40px;
  grid-template:
    'Card ClosedSupportGraphic' minmax(auto, auto)
    'GeneralComparisonGraphic GeneralComparisonGraphic' minmax(auto, auto)
    'StatusUpdatesGraphic StatusUpdatesGraphic' minmax(auto, auto)
    'CallDuration CallDuration' minmax(auto, auto)
    / 600px 360px;
  padding: 60px 0;
`;

function Support() {
  return (
    <AnalyticsProvider>
      <Container>
        <DashboardHeader />
        <Content>
          <DashboardProfile />
          <Graphics.ClosedSupportGraphic />
          <Graphics.GeneralComparisonGraphic />
          <Graphics.StatusUpdatesGraphic />
        </Content>
      </Container>
    </AnalyticsProvider>
  );
}

export default Support;
