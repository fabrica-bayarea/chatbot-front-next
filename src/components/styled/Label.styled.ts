import styled from 'styled-components';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  & > span {
    font-size: 0.9em;
    font-weight: bold;
  }
`;
