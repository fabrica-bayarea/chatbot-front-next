import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  input {
    padding-right: 50px;
  }

  button {
    aspect-ratio: 2 / 1;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    width: 40px;
  }
`;
