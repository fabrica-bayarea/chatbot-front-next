import { useContext } from 'react';

import { AnalyticsContext } from '@/context';
import type { AnalyticsContextShared } from '@/utils/definitions';

// This hook is necessary to ensure that the Context will not be undefined (TS)
function useAnalyticsContext(): AnalyticsContextShared {
  const context = useContext(AnalyticsContext);

  if (context === undefined) {
    throw new Error('AnalyticsContext must be used within a provider');
  }

  return context;
}

export default useAnalyticsContext;
