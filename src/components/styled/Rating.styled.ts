import styled from 'styled-components';

const Rating = styled.div<{ $rating: number }>`
  --h: 30px;

  height: var(--h);
  position: relative;
  width: calc(var(--h) * 5);

  &::before {
    background-image: url('/star.svg');
    background-size: contain;
    content: '';
    height: var(--h);
    left: 0;
    opacity: 0.2;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &::after {
    background-image: url('/star.svg');
    background-size: contain;
    content: '';
    height: var(--h);
    left: 0;
    opacity: 0.5;
    position: absolute;
    top: 0;
    width: ${({ $rating }) => ($rating / 5) * 100}%;
  }
`;

export default Rating;
