import { Fragment } from 'react';

import { LineBreaksProps } from '@/lib/definitions';

function LineBreaks({ content }: LineBreaksProps) {
  const lines = content.split('\n');

  return lines.map((line, index) => {
    if (line === '') {
      return <br key={index} />;
    }

    if (index === lines.length - 1) {
      return <span key={index}>{line}</span>;
    }

    return (
      <Fragment key={index}>
        <span>{line}</span>
        <br />
      </Fragment>
    );
  });
}

export default LineBreaks;
