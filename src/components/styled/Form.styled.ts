import styled from 'styled-components';

export const Form = styled.form<{ $padding?: string }>`
  align-items: center;
  display: flex;
  gap: 100px;
  padding: ${(props) => props.$padding ?? '0'};
  width: 100%;
`;

export const ColumnForm = styled(Form)`
  flex-direction: column;
  gap: 20px;
  padding: 40px 40px 0;
  width: 100%;

  & > .upload {
    align-items: flex-end;
    display: flex;
    gap: 5px;
    width: 100%;
  }

  & > .status {
    height: 50px;

    & > span {
      align-items: center;
      color: var(--clr-b);
      display: flex;
      gap: 10px;
    }
  }
`;
