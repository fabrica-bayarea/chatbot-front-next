'use client';

import styled from 'styled-components';

import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import { AnalyticsProvider } from '@/context';
import * as Graphics from '@/components/Dashboard/Graphics';
import DashboardProfile from '@/components/Dashboard/DashboardProfile';

import { device } from '@/utils/analyticsStyles';

export const Container = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 40px);
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
  padding: 70px;

  display: grid;
  grid-template-rows: auto;
  row-gap: 40px;
  column-gap: 40px;

  grid-template:
    'Card ClosedSupportGraphic' minmax(auto, auto)
    'GeneralComparisonGraphic GeneralComparisonGraphic' minmax(auto, auto)
    'StatusUpdatesGraphic StatusUpdatesGraphic' minmax(auto, auto)
    'CallDuration CallDuration' minmax(auto, auto)
    / 600px 360px;

  @media ${device.lg} {
    grid-template:
      'Card ClosedSupportGraphic' minmax(auto, auto)
      'StatusUpdatesGraphic StatusUpdatesGraphic' minmax(auto, auto)
      'GeneralComparisonGraphic GeneralComparisonGraphic' minmax(auto, auto)
      'CallDuration CallDuration' minmax(auto, auto)
      / 795px 510px;
  }

  @media ${device.md} {
    grid-template:
      'Card' minmax(auto, auto)
      'ClosedSupportGraphic' minmax(auto, auto)
      'StatusUpdatesGraphic' minmax(auto, auto)
      'GeneralComparisonGraphic' minmax(auto, auto)
      'CallDuration' minmax(auto, auto)
      / 500px;

    justify-content: center;
  }

  @media ${device.sm} {
    grid-template:
      'Card' minmax(auto, auto)
      'ClosedSupportGraphic' minmax(auto, auto)
      'StatusUpdatesGraphic' minmax(auto, auto)
      'GeneralComparisonGraphic' minmax(auto, auto)
      'CallDuration' minmax(auto, auto)
      / 600px;
  }

  @media ${device.xs} {
    grid-template:
      'Card' minmax(auto, auto)
      'ClosedSupportGraphic' minmax(auto, auto)
      'StatusUpdatesGraphic' minmax(auto, auto)
      'GeneralComparisonGraphic' minmax(auto, auto)
      'CallDuration' minmax(auto, auto)
      / 400px;
  }
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
