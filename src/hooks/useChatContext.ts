import { useContext } from 'react';

import { ChatContext } from '@/context';

function useChatContext() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error('ChatContext must be used within a provider');
  }

  return context;
}

export default useChatContext;
