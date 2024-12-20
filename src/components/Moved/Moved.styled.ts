import styled from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

export const Container = styled.section`
  align-items: center;
  background: linear-gradient(to bottom, white 80%, var(--clr-a) 120%);
  gap: 40px;
  justify-content: center;
  padding: 0 20px;

  & > span:first-child {
    font-size: 1.5rem;
    text-align: center;
  }

  & > span:nth-child(2) {
    color: var(--clr-a);
    font-size: 5rem;
  }

  ${mediaQueries.mobileL} {
    & > span:first-child {
      font-size: 1.2rem;
      text-align: center;
    }

    & > span:nth-child(2) {
      font-size: 2.5rem;
    }
  }
`;
