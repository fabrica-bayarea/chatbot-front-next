import styled from "styled-components";

export const Notification = styled.span<{ $count: number }>`
  align-items: center;
  aspect-ratio: 1;
  background-color: var(--clr-blue);
  border-radius: 50%;
  color: var(--clr-light);
  display: flex;
  font-weight: 800;
  justify-content: center;
  visibility: ${({ $count }) => ($count === 0 ? 'hidden' : 'visible')};
  width: 30px;
`;
