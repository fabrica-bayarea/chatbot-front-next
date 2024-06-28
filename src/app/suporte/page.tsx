'use client';

import styled from 'styled-components';

const Container = styled.section`
  align-items: center;
  background: linear-gradient(to bottom, var(--clr-light) 80%, var(--clr-a) 120%);
  gap: 20px;
  padding: 80px 40px 20px;
  height: calc(100vh - 40px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-a);
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: [col1-start] 320px [col2-start] 320px [col3-start] 320px [col3-end];
  grid-template-rows: [row1-start] 240px [row2-start] 240px [row2-end];

  @media screen and (width <= 1440px) {
    grid-template-columns: [col1-start] 320px [col2-start] 320px [col2-end];
    grid-template-rows: [row1-start] 240px [row2-start] 240px [row3-start] 240px [row3-end];
  }

  @media screen and (width <= 1024px) {
    grid-gap: 20px;
  }

  @media screen and (width <= 768px) {
    grid-template-columns: 320px;
    grid-template-rows: repeat(6, 240px);
  }

  @media screen and (width <= 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 240px);
    width: 100%;
  }
`;

const Box = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 20%);
  padding: 20px;

  &.a {
    grid-column: col1-start / col3-start;
    grid-row: row1-start;
  }

  &.b {
    grid-column: col3-start;
    grid-row: row1-start / row2-end;
  }

  &.c {
    grid-column: col1-start;
    grid-row: row2-start;
  }

  &.d {
    grid-column: col2-start;
    grid-row: row2-start;
  }

  @media screen and (width <= 1440px) {
    &.a {
      grid-column: col1-start / col2-end;
      grid-row: row1-start;
    }

    &.b {
      grid-column: col1-start;
      grid-row: row2-start / row3-end;
    }

    &.c {
      grid-column: col2-start;
      grid-row: row2-start;
    }

    &.d {
      grid-column: col2-start;
      grid-row: row3-start;
    }
  }

  @media screen and (width <= 768px) {
    &.a {
      grid-column: 1;
      grid-row: 1 / 3;
    }

    &.b {
      grid-column: 1;
      grid-row: 3 / 5;
    }

    &.c {
      grid-column: 1;
      grid-row: 5;
    }

    &.d {
      grid-column: 1;
      grid-row: 6;
    }
  }
`;

function Support() {
  return (
    <Container>
      <Wrapper>
        <Box className="a"></Box>
        <Box className="b"></Box>
        <Box className="c"></Box>
        <Box className="d"></Box>
      </Wrapper>
    </Container>
  );
}

export default Support;
