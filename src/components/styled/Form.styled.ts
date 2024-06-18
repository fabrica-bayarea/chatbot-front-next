import styled from 'styled-components';

export const Form = styled.form`
  align-items: center;
  display: flex;
  position: relative;
  width: 100%;
`;

export const ColumnForm = styled(Form)`
  flex-direction: column;
  gap: 20px;

  & > div {
    display: flex;

    &.upload {
      align-items: flex-end;
      gap: 10px;
      width: 100%;
    }

    &.status {
      align-items: flex-end;
      height: 60px;

      & > span {
        align-items: center;
        color: var(--clr-b);
        display: flex;
        gap: 10px;
      }
    }
  }
`;
