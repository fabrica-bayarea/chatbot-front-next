import styled from 'styled-components';

export const Dialog = styled.div`
  background-color: var(--clr-light);
  border: 2px solid var(--clr-a);
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
  gap: 10px;
  line-height: 20px;
  padding: 20px;
  position: relative;

  & > button {
    position: absolute;
    right: 0;
    top: 0;
  }

  & > div {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
`;

export const QuestionContainer = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  font-style: italic;

  & > span {
    flex-grow: 10;
  }
`;
