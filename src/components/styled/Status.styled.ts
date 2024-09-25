import styled, { css } from 'styled-components';

import { SupportStatus } from '@/utils/definitions';

export const Status = styled.div<{ $status?: SupportStatus }>`
  aspect-ratio: 1;
  background-color: var(--clr-light-gray);
  border-radius: 50%;
  opacity: 0.8;
  width: 20px;

  ${({ $status }) =>
    $status === 'accepted' &&
    css`
      animation: pulse 1500ms infinite;
      background-color: var(--clr-b);
    `}
`;

export const LoadingStatus = styled(Status)`
  opacity: 0.4;
`;
