import styled from 'styled-components';

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > span:nth-child(1) {
    font-size: 0.75em;
  }

  & > span:nth-child(2) {
    font-size: 0.75em;
    margin-bottom: 10px;
  }

  & > span:nth-child(3) {
    font-size: 0.9em;
  }
`;

export const List = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  width: 100%;

  & > span {
    margin: 120px 0 40px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }
`;

export const ListItem = styled.li`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding: 20px 10px 20px 40px;
  transition: background-color 200ms ease;
  width: 100%;

  &:hover {
    background-color: var(--clr-light);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--clr-light);
  }
`;

export const LoadingItem = styled(ListItem)`
  cursor: default;

  &:hover {
    background-color: unset;
  }
`;
