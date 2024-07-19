import styled, { css } from 'styled-components';

export const Container = styled.div<{ $alignment?: 'start' | 'end' }>`
  display: flex;
  flex-direction: column;
  position: relative;

  & > div:first-of-type {
    left: -20px;
    position: absolute;
    top: -20px;

    ${({ $alignment }) =>
      $alignment === 'end' &&
      css`
        left: unset;
        right: -20px;
      `}
  }
`;

export const Message = styled.span<{
  $alignment?: 'start' | 'end';
  $bgColor?: string;
}>`
  --r: 8px;
  --radius: 0 var(--r) var(--r) 0;
  --radius-inverted: var(--r) 0 0 var(--r);

  align-self: flex-start;
  background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : 'var(--clr-a)')};
  border-radius: var(--radius);
  line-height: 1.4rem;
  padding: 12px 18px;
  white-space: pre-line;

  ${({ $alignment }) =>
    $alignment === 'end' &&
    css`
      align-self: flex-end;
      border-radius: var(--radius-inverted);
    `}
`;
