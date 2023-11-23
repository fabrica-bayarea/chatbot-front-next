import styled from 'styled-components';

import { mediaQueries } from '@/utils';

const Form = styled.form<{ $padding?: string }>`
  align-items: center;
  display: flex;
  gap: 100px;
  padding: ${(props) => props.$padding ?? '0'};
  width: 100%;
`;

const ColumnForm = styled(Form)`
  flex-direction: column;
  gap: 20px;
  padding: 40px 40px 0;
  width: 100%;

  & > div {
    height: 50px;

    & > span {
      align-items: center;
      color: var(--clr-b);
      display: flex;
      gap: 10px;
    }
  }

  ${mediaQueries.mobileL} {
    padding: 40px 20px 0;
  }
`;

export { Form, ColumnForm };
