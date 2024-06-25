import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;

  & > input {
    display: none;
  }
`;

export const Label = styled.label`
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  width: 80px;
`;
