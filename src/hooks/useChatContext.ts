import { useContext } from 'react';

import { ChatContext } from '@/context';
import { ChatContextShared } from '@/utils/definitions';

// This hook is necessary to ensure that the Context will not be undefined (TS)
function useChatContext(): ChatContextShared {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error('ChatContext must be used within a provider');
  }

  return context;
}

export default useChatContext;
