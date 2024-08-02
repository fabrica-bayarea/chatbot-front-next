import styled, { css } from 'styled-components';

import { IconButton } from '@/components/styled';
import { mediaQueries } from '@/utils/mediaQueries';

export const Container = styled.header`
  align-items: center;
  background-color: var(--clr-b);
  background-image: linear-gradient(
    to bottom right,
    rgba(255 255 255 / 10%),
    rgba(255 255 255 / 0%) 80%
  );
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
  color: var(--clr-light);
  display: flex;
  gap: 20px;
  height: 120px;
  padding: 0 60px;
  z-index: 10;

  ${mediaQueries.laptopS} {
    font-size: 14px;
    height: 100px;
    padding: 0 12px 0 20px;
  }

  ${mediaQueries.mobileL} {
    font-size: 10px;
    gap: 10px;
    height: 80px;
  }
`;

export const MoreButton = styled(IconButton)`
  display: none;

  ${mediaQueries.laptopL} {
    display: flex;
  }
`;

export const Options = styled.div<{ $isVisible: boolean }>`
  position: relative;

  & > nav {
    display: flex;
    gap: 20px;

    & > span {
      bottom: -25px;
      font-size: 0.75rem;
      left: 20px;
      position: absolute;
    }
  }

  ${mediaQueries.laptopL} {
    & > nav {
      background-color: var(--clr-b);
      border: 1px solid var(--clr-c);
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
      flex-direction: column;
      gap: unset;
      opacity: 0;
      padding: 10px 0;
      position: absolute;
      right: 20px;
      top: 40px;
      transition: opacity 400ms ease, top 400ms ease;
      visibility: hidden;
      z-index: 10;

      ${({ $isVisible }) =>
        $isVisible &&
        css`
          opacity: 1;
          top: 50px;
          visibility: visible;
        `}
    }
  }
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 10px;

  & > span:first-child {
    font-size: 1.8em;
    left: -2px;
    position: relative;
  }

  ${mediaQueries.mobileL}{
    & > span:last-child {
      display: none;
    }
  }
`;
