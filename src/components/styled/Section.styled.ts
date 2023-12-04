import styled from 'styled-components';

export const Section = styled.section`
  --r: 20px;

  border-radius: var(--r);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
  display: flex;
  flex-direction: column;
  width: 420px;

  & > header {
    align-items: center;
    background-color: var(--clr-d);
    border-radius: var(--r) var(--r) 0 0;
    color: white;
    display: flex;
    height: 120px;
    justify-content: space-between;
    padding: 0 40px;

    & > h2 {
      font-size: 2em;
    }

    & > span {
      font-size: 1.5em;
    }
  }

  & > div {
    align-items: center;
    background-color: white;
    border-radius: 0 0 var(--r) var(--r);
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    padding-bottom: 40px;
  }
`;
