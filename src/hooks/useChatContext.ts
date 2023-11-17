import { useContext } from 'react';

import { ChatContext } from '@/context';

// This hook is necessary to ensure that the Context will not be undefined (TS)
function useChatContext() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error('ChatContext must be used within a provider');
  }

  return context;
}

export default useChatContext;
