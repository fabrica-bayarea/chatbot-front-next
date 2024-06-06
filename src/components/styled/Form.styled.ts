import styled from 'styled-components';

export const Form = styled.form<{ $padding?: string }>`
  align-items: center;
  display: flex;
  /* gap: 100px; */
  /* padding: ${(props) => props.$padding ?? '0'}; */
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
      height: 60px;
      align-items: flex-end;

      & > span {
        align-items: center;
        color: var(--clr-b);
        display: flex;
        gap: 10px;
      }
    }
  }
`;
