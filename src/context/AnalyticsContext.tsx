'use client';

import { createContext, type ReactNode, useState } from 'react';

import { analytics } from '@/utils/analytics';
import type { AnalyticsContextShared } from '@/utils/definitions';

const AnalyticsContext = createContext<AnalyticsContextShared | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState('yesterday');

  return (
    <AnalyticsContext.Provider
      value={{
        analytics,
        filteredData: analytics[filter],
        setFilter,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsContext;
