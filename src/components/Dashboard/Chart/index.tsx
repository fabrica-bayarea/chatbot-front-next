'use client';

import Highcharts, { type Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = ({ options }: { options: Options }) => {
  // bug fix
  if (typeof Highcharts === 'object') {
    Highcharts.setOptions({
      rangeSelector: {
        enabled: false,
      },
      navigator: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      lang: {
        shortMonths: [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez',
        ],
        decimalPoint: ',',
        thousandsSep: '.',
      },
    });
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
