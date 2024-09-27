import styled, { css } from 'styled-components';

import { Form } from '@/components/styled';
import { mediaQueries } from '@/utils/mediaQueries';

export const Container = styled(Form)<{ $background?: boolean }>`
  align-items: flex-end;
  background-color: white;
  border-top: 1px solid var(--clr-light);
  bottom: 0;
  font-size: 1.2rem;
  gap: 10px;
  left: 0;
  padding: 10px 20%;
  position: absolute;
  z-index: 10;

  ${mediaQueries.laptopS} {
    padding: 10px 80px;
  }

  ${mediaQueries.mobileL} {
    padding: 10px 20px;
  }

  ${({ $background }) =>
    $background &&
    css`
      background-color: var(--clr-light);
      border-top: none;
      font-size: 1rem;
    `}
`;
