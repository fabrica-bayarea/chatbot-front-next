// https://www.highcharts.com/docs/index

'use client';

import Highcharts, { type Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = ({ chartOptions }: { chartOptions: Options }) => {
  const highchartsOptions = {
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    lang: {
      decimalPoint: ',',
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
      thousandsSep: '.',
    },
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
  };

  // The condition is necessary to fix a Next rendering bug
  if (typeof Highcharts === 'object') {
    Highcharts.setOptions(highchartsOptions);
  }

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default Chart;
