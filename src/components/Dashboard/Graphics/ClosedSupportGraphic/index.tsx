import { TooltipFormatterContextObject } from 'highcharts';

import { Container } from './ClosedSupportGraphic.styled';
import Chart from '@/components/Dashboard/Chart';
import ChartTitle from '@/components/Dashboard/ChartTitle';
import { useAnalyticsContext } from '@/hooks';
import { analyticsColors } from '@/utils/analyticsStyles';

const ClosedSupportGraphic = () => {
  const { filteredData } = useAnalyticsContext();

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'pie',
      height: 250,
      width: 250,
    },
    series: [
      {
        type: 'pie',
        innerSize: '50%',
        data: [
          {
            name: 'Total',
            color: analyticsColors.secondary,
            x: filteredData.closedSupportGraphic.total.value,
            y: filteredData.closedSupportGraphic.total.porcentage,
          },

          {
            name: 'Seus atendimentos',
            color: analyticsColors.primary,
            x: filteredData.closedSupportGraphic.own.value,
            y: filteredData.closedSupportGraphic.own.porcentage,
          },
        ],
      },
    ],
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    tooltip: {
      useHTML: true,
      formatter() {
        const self: TooltipFormatterContextObject = this;
        return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; z-index: 1">
                <h1 style="font-size: 30px; font-family: var(--font-a); color: var(--clr-dark); margin: 0px;"> ${self.point.y}% </h1>
                <span style="font-size: 16px; font-weight: 500; font-style: normal; color: var(--clr-dark-gray)">${self.point.x} Chamadas</span>
                </div>`;
      },
      positioner() {
        return { x: 20, y: 20 };
      },
    },
  };

  return (
    <Container>
      <ChartTitle title="Atendimentos encerrados" description="Relacione com o total." />
      <Chart options={options} />
    </Container>
  );
};

export default ClosedSupportGraphic;
