import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

export const Container = styled.header`
  width: 100%;

  & > h1 {
    font-size: 3rem;
    left: -3px;
    margin-bottom: 10px;
    position: relative;
  }

  & > span {
    color: var(--clr-gray);
  }
`;

export const SelectContainer = styled.section`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: flex-end;
  margin-top: 40px;

  & > select {
    border: none;
    font-family: inherit;
    font-size: inherit;
    padding: 20px 10px;
  }

  ${mediaQueries.mobileM} {
    gap: 10px;
  }
`;
