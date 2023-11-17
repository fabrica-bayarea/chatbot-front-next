import styled from 'styled-components';

import { mediaQueries } from '@/utils';

const Main = styled.main`
  align-items: center;
  background-color: var(--clr-b);
  display: flex;
  justify-content: space-evenly;
  min-height: 100vh;

  ${mediaQueries.laptopS} {
    flex-direction: column;
    justify-content: flex-start;
  }

  ${mediaQueries.mobileL} {
    padding: 0 10px 20px;
  }

  ${mediaQueries.mobileM} {
    font-size: 0.9rem;
  }
`;

export { Main };
