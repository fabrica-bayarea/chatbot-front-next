import styled from 'styled-components';

export const Container = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  flex-grow: 10;
  gap: 10px;
  justify-content: flex-end;

  & > span {
    background-color: var(--clr-light);
    border-radius: 12px;
    padding: 16px;

    &:hover {
      background-color: var(--clr-a);
      cursor: pointer;
    }
  }
`;
