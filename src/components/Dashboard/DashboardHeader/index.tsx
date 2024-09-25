'use client';

import { Container, SelectContainer } from './DashboardHeader.styled';
import { useAnalyticsContext } from '@/hooks';

const options = [
  {
    title: 'Ontem',
    value: 'yesterday',
  },
  {
    title: 'Últimos 30 dias',
    value: 'last_30_days',
  },
  {
    title: 'Últimos 6 meses',
    value: 'last_6_months',
  },
  {
    title: 'Últimos 12 meses',
    value: 'last_12_months',
  },
];

function DashboardHeader() {
  const { setFilter } = useAnalyticsContext();

  return (
    <Container>
      <h1>Dashboard</h1>
      <span>Visualize informações sobre seu perfil e seus atendimentos.</span>
      <SelectContainer>
        <label htmlFor="period-select">Selecione um período:</label>
        <select
          id="period-select"
          name="select-period"
          onChange={(event) => setFilter(event.target.value)}
        >
          {options.map((element) => (
            <option key={element.value} value={element.value}>
              {element.title}
            </option>
          ))}
        </select>
      </SelectContainer>
    </Container>
  );
}

export default DashboardHeader;
