// https://www.highcharts.com/docs/chart-and-series-types/column-chart

import { type Options, TooltipFormatterContextObject } from 'highcharts';

import { ChartContainer, Container } from './GeneralComparisonChart.styled';
import Chart from '@/components/Dashboard/Charts/Chart';
import ChartTitle from '@/components/Dashboard/Charts/ChartTitle';
import { useAnalyticsContext } from '@/hooks';

function GeneralComparisonChart() {
  const { colors, filteredData } = useAnalyticsContext();

  const chartOptions: Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      marginTop: 50,
    },
    series: [
      {
        type: 'column',
        color: colors.primary,
        data: filteredData.generalComparisonChart.own,
        name: 'Seus atendimentos ',
      },
      {
        type: 'column',
        color: colors.secondary,
        data: filteredData.generalComparisonChart.general,
        name: 'Total',
      },
    ],
    xAxis: {
      categories: [
        'Novos atendimentos',
        'Atendimentos aceitos',
        'Atendimentos encerrados',
      ],
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    plotOptions: {
      column: {
        borderRadius: 4,
      },
    },
    title: {
      text: '',
    },
    tooltip: {
      useHTML: true,
      formatter() {
        const self: TooltipFormatterContextObject = this;
        return `
          <div style="align-items: center; display: flex; flex-direction: column; justify-content: center; padding: 5px; z-index: 1;">
            <h1 style="color: var(--clr-dark); font-size: 24px; font-family: var(--font-a);">
              ${self.point.y}
            </h1>
            <span style="color: var(--clr-dark-gray); font-size: 16px;">
              Chamadas
            </span>
          </div>
        `;
      },
    },
  };

  return (
    <Container>
      <ChartTitle
        title="Comparação geral"
        description="Analise sua participação em relação ao total de atendimentos."
      />
      <ChartContainer>
        <Chart chartOptions={chartOptions} />
      </ChartContainer>
    </Container>
  );
}

export default GeneralComparisonChart;
