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
  padding: 10px;
  position: absolute;
  z-index: 10;

  ${({ $background }) =>
    $background &&
    css`
      background-color: var(--clr-light);
      border-top: none;
      font-size: 1rem;
      padding: 15px 20%;

      ${mediaQueries.laptopS} {
        padding: 15px 80px;
      }

      ${mediaQueries.mobileL} {
        padding: 15px 20px;
      }
    `}
`;
