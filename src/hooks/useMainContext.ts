import { useContext } from 'react';

import { MainContext } from '@/context';
import { MainContextShared } from '@/utils/definitions';

// This hook is necessary to ensure that the Context will not be undefined (TS)
function useMainContext(): MainContextShared {
  const context = useContext(MainContext);

  if (context === undefined) {
    throw new Error('MainContext must be used within a provider');
  }

  return context;
}

export default useMainContext;
