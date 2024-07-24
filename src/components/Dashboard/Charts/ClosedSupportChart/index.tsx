// https://www.highcharts.com/docs/chart-and-series-types/pie-chart

import { type Options, type TooltipFormatterContextObject } from 'highcharts';

import { Container } from './ClosedSupportChart.styled';
import Chart from '@/components/Dashboard/Charts/Chart';
import ChartTitle from '@/components/Dashboard/Charts/ChartTitle';
import { useAnalyticsContext } from '@/hooks';

const ClosedSupportChart = () => {
  const { colors, filteredData } = useAnalyticsContext();

  const chartOptions: Options = {
    chart: {
      type: 'pie',
      height: 250,
      width: 250,
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            name: 'Seus atendimentos',
            color: colors.primary,
            sliced: true,
            x: filteredData.closedSupportChart.own.value,
            y: filteredData.closedSupportChart.own.porcentage,
          },
          {
            name: 'Total',
            color: colors.secondary,
            x: filteredData.closedSupportChart.total.value,
            y: filteredData.closedSupportChart.total.porcentage,
          },
        ],
      },
    ],
    plotOptions: {
      pie: {
        borderRadius: 0,
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
        size: 150,
        slicedOffset: 5,
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
              ${self.point.y}%
            </h1>
            <span style="color: var(--clr-dark-gray); font-size: 16px;">
              ${self.point.x} Chamadas
            </span>
          </div>
        `;
      },
      positioner() {
        return { x: 20, y: 20 };
      },
    },
  };

  return (
    <Container>
      <ChartTitle title="Atendimentos encerrados" description="Relacione com o total." />
      <Chart chartOptions={chartOptions} />
    </Container>
  );
};

export default ClosedSupportChart;
