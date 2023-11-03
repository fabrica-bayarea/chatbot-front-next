import { useContext } from 'react';

import { MainContext } from '@/context';

function useMainContext() {
  const context = useContext(MainContext);

  if (context === undefined) {
    throw new Error('MainContext must be used within a provider');
  }

  return context;
}

export default useMainContext;
