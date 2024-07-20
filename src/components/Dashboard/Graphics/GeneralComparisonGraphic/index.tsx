import { TooltipFormatterContextObject } from 'highcharts';

import { Container } from './GeneralComparisonGraphic.styled';
import Chart from '@/components/Dashboard/Chart';
import ChartTitle from '@/components/Dashboard/ChartTitle';
import { useAnalyticsContext } from '@/hooks';
import { analyticsColors } from '@/utils/analyticsStyles';

function GeneralComparisonGraphic() {
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
        name: 'Total',
        color: analyticsColors.secondary,
        data: filteredData.generalComparisonGraphic.general,
      },
      {
        type: 'column',
        name: 'Seus atendimentos ',
        color: analyticsColors.primary,
        data: filteredData.generalComparisonGraphic.own,
      },
    ],
    xAxis: {
      categories: [
        'Novos atendimentos',
        'Atendimentos aceitos',
        'Atendimentos encerrados',
      ],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
      gridLineWidth: 1,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 3,
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
        title="Comparação geral"
        description="Analise sua participação em relação ao total de atendimentos."
      />
      <Chart options={options} />
    </Container>
  );
}

export default GeneralComparisonGraphic;
