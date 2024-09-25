import { useContext } from 'react';

import { AnalyticsContext } from '@/context';
import { AnalyticsContextShared } from '@/utils/definitions';

// This hook is necessary to ensure that the Context will not be undefined (TS)
function useMainContext(): AnalyticsContextShared {
  const context = useContext(AnalyticsContext);

  if (context === undefined) {
    throw new Error('MainContext must be used within a provider');
  }

  return context;
}

export default useMainContext;
