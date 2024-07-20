import styled from 'styled-components';

import { device } from '@/utils/analyticsStyles';

export const Container = styled.header`
  width: 1000px;

  & > h1 {
    font-size: 3rem;
    left: -3px;
    margin-bottom: 10px;
    position: relative;
  }

  & > span {
    color: var(--clr-gray);
  }

  @media ${device.xs} {
    padding: 80px 40px 0px 40px;
  }
`;

export const Content = styled.section`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: flex-end;
  margin-top: 40px;

  @media ${device.xs} {
    flex-direction: column;
    height: 130px;
  }

  & > select {
    border: none;
    font-family: inherit;
    font-size: inherit;
    padding: 10px;
  }
`;
