import styled from 'styled-components';

import { devices } from '@/utils';

const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 40px 0;
  width: 100%;

  & > div {
    height: 50px;

    & > span {
      align-items: center;
      color: var(--clr-red);
      display: flex;
      gap: 10px;
    }
  }

  @media ${devices.mobileL} {
    padding: 40px 20px 0;
  }
`;

export { Form };
