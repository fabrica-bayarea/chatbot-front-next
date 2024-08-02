// https://www.highcharts.com/docs/chart-and-series-types/spline-chart

import { type Options, type TooltipFormatterContextObject } from 'highcharts';

import { ChartContainer, Container } from './StatusUpdateChart.styled';
import Chart from '@/components/Dashboard/Charts/Chart';
import ChartTitle from '@/components/Dashboard/Charts/ChartTitle';
import { useAnalyticsContext } from '@/hooks';

function StatusUpdateChart() {
  const { colors, filteredData } = useAnalyticsContext();

  const chartOptions: Options = {
    chart: {
      type: 'spline',
      backgroundColor: 'transparent',
      marginTop: 50,
    },
    series: [
      {
        type: 'spline',
        color: colors.secondary,
        data: filteredData.statusUpdateChart.openSupport,
        name: 'Atendimentos aceitos',
      },
      {
        type: 'spline',
        color: colors.primary,
        data: filteredData.statusUpdateChart.closedSupport,
        name: 'Atendimentos encerrados',
      },
    ],
    xAxis: {
      labels: {
        formatter: function () {
          return this.value + ':00';
        },
      },
      max: 18,
      min: 6,
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
            <span style="color: var(--clr-dark-gray); font-size: 12px; margin-top: 10px;">
             Horário: ${self.point.x}:00
            </span>
          </div>
        `;
      },
    },
  };

  return (
    <Container>
      <ChartTitle
        title="Atualizações de status"
        description="Acompanhe a quantidade de atendimentos aceitos e encerrados a cada hora."
      />
      <ChartContainer>
        <Chart chartOptions={chartOptions} />
      </ChartContainer>
    </Container>
  );
}

export default StatusUpdateChart;
