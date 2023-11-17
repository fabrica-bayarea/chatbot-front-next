import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  & > span {
    font-size: 0.75em;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export { Label };
