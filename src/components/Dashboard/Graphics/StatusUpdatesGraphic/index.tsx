import { TooltipFormatterContextObject } from 'highcharts';

import { Container } from './StatusUpdatesGraphic.styled';
import Chart from '@/components/Dashboard/Chart';
import ChartTitle from '@/components/Dashboard/ChartTitle';
import { useAnalyticsContext } from '@/hooks';
import { analyticsColors } from '@/utils/analyticsStyles';

function StatusUpdatesGraphic() {
  const { filteredData } = useAnalyticsContext();

  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    chart: {
      type: 'column',
      marginTop: 50,
    },
    series: [
      {
        type: 'column',
        name: 'Atendimentos aceitos',
        color: analyticsColors.secondary,
        data: filteredData.statusUpdatesGraphic.openSupport,
      },
      {
        type: 'spline',
        name: 'Atendimentos encerrados',
        color: analyticsColors.primary,
        data: filteredData.statusUpdatesGraphic.closedSupport,
      },
    ],
    xAxis: {
      min: 6,
      max: 18,
      tickInterval: 1,
      labels: {
        formatter: function () {
          return this.value + ':00';
        },
      },
    },
    yAxis: {
      title: {
        text: '',
      },
      gridLineWidth: 1,
    },
    plotOptions: {
      column: {
        borderRadius: 4,
      },
    },
    tooltip: {
      useHTML: true,
      formatter() {
        const self: TooltipFormatterContextObject = this;
        return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px; z-index: 1">
                <h1 style="font-size: 30px; font-family: var(--font-a); color: var(--clr-dark); margin: 0px;"> ${self.point.y}</h1>
                <span style="font-size: 16px; font-weight: 500; font-style: normal; color: var(--clr-dark-gray)">Chamadas</span>
                </div>`;
      },
    },
  };

  return (
    <Container>
      <ChartTitle
        title="Atualizações de status"
        description="Acompanhe a quantidade de atendimentos aceitos e encerrados a cada hora."
      />
      <Chart options={options} />
    </Container>
  );
}

export default StatusUpdatesGraphic;
