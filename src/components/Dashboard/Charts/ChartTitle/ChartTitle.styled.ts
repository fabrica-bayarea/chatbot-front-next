import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

export const Container = styled.header`
  border-bottom: 1px solid var(--clr-lighter-gray);
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 30px 20px 20px;
  width: 100%;

  & > h3 {
    font-size: 1.2rem;
  }

  & > span {
    color: var(--clr-gray);
    font-size: 0.9rem;
  }

  ${mediaQueries.laptopM} {
    & > h3 {
      font-size: 1rem;
    }
  }
`;
