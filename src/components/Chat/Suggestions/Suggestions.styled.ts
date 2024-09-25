import styled from 'styled-components';

export const Container = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > span {
    background-color: var(--clr-light);
    border-radius: 4px;
    padding: 12px;

    &:hover {
      background-color: var(--clr-a);
      cursor: pointer;
    }
  }
`;
