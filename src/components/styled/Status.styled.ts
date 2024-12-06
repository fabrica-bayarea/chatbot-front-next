import styled, { css } from 'styled-components';

import { SupportStatus } from '@/utils/definitions';

export const Status = styled.div<{ $status?: SupportStatus; $activity?: boolean }>`
  aspect-ratio: 1;
  background-color: var(--clr-light-gray);
  border-radius: 50%;
  opacity: 0.8;
  width: 20px;

  ${({ $status }) =>
    $status === 'accepted' &&
    css`
      background-color: var(--clr-blue);
    `}

  ${({ $activity }) =>
    $activity &&
    css`
      animation: pulse 2500ms infinite;
    `}
`;

export const LoadingStatus = styled(Status)`
  opacity: 0.4;
`;
