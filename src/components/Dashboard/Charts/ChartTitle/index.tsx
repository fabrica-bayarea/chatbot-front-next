'use client';

import { Container } from './ChartTitle.styled';

function ChartTitle({ title, description }: { title: string; description?: string }) {
  return (
    <Container>
      <h3>{title}</h3>
      <span>{description}</span>
    </Container>
  );
}

export default ChartTitle;
