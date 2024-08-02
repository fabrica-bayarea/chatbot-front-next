import styled from 'styled-components';

export const DashboardCard = styled.div`
  background-color: white;
  border: 1px solid var(--clr-light);
  border-radius: 16px;
  box-shadow: 0 2px 4px 0 rgba(255 150 150 / 20%);
  display: flex;
  flex-direction: column;
  min-height: 360px;
  transition: box-shadow ease-in-out 250ms;

  &:hover {
    box-shadow: 0 0 20px 0 rgba(255 150 150 / 25%);
  }
`;
