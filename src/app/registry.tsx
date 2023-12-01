'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { Fragment, ReactNode, useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  // Only create stylesheet once with lazy initial state.
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();

    return <Fragment>{styles}</Fragment>;
  });

  if (typeof window !== 'undefined') {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}

export default StyledComponentsRegistry;
