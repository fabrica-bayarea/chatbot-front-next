import styled, { css } from 'styled-components';

import { mediaQueries } from '@/utils/mediaQueries';

export const Container = styled.div<{ $visible: boolean }>`
  align-items: center;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  display: flex;
  font-weight: 200;
  font-size: 24px;
  gap: 40px;
  height: 0;
  justify-content: center;
  opacity: 0;
  overflow: hidden;
  padding: 0 10px;
  text-align: center;
  transition: opacity 1200ms ease;

  ${({ $visible }) =>
    $visible &&
    css`
      min-height: 120px;
      opacity: 1;
    `}

  & > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  & a {
    border-bottom: 1px solid var(--clr-dark);
    font-size: 14px;
    font-weight: 500;
    width: fit-content;
  }

  ${mediaQueries.tablet} {
    font-size: 20px;
    font-weight: 300;
    gap: 20px;
  }

  ${mediaQueries.mobileL} {
    font-size: 16px;
    font-weight: 400;
  }
`;
