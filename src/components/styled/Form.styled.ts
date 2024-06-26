import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  position: relative;
  width: 100%;
`;

export const MainForm = styled(Form)`
  flex-direction: column;
  gap: 20px;
`;

export const StatusContainer = styled.div`
  align-items: flex-end;
  display: flex;
  height: 50px;
  justify-content: center;

  & > span {
    align-items: center;
    color: var(--clr-b);
    display: flex;
    font-size: 0.9rem;
    gap: 10px;
  }
`;

export const UploadContainer = styled.div`
  align-items: flex-end;
  display: flex;
  gap: 10px;
  width: 100%;
`;
