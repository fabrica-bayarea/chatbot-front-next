import styled from 'styled-components';

export const DarshboardCard = styled.div`
  border: 1px solid var(--clr-light);
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(255 150 150 / 20%);
  display: flex;
  flex-direction: column;
  transition: ease-in-out 250ms;

  &:hover {
    box-shadow: 0 0 20px 0 rgba(255 150 150 / 25%);
  }
`;
