'use client';

import { Container } from './ChartTitle.styled';

function ChartTitle({ title, description }: { title: string; description?: string }) {
  return (
    <Container>
      <h6>{title}</h6>
      <span>{description}</span>
    </Container>
  );
}

export default ChartTitle;
