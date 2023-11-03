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
    color: var(--clr-red);
    height: 50px;
    text-align: center;

    svg {
      margin-right: 10px;
    }
  }

  @media ${devices.mobileL} {
    padding: 40px 20px 0;
  }
`;

export { Form };
