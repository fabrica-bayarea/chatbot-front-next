'use client';

import { createContext, ReactNode, useCallback, useState } from 'react';

import usePresence from '@/hooks/usePresence';
import type { MainContextShared, Profile } from '@/utils/definitions';

const MainContext = createContext<MainContextShared | undefined>(undefined);

export function MainProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: Profile | null;
}) {
  const presence = usePresence(user?.id);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const setAndShow = (content: string) => {
    setMessage(content);
    setShowMessage(true);
  };

  const shared: MainContextShared = {
    isLoading,
    message,
    setAndShow,
    setIsLoading,
    setShowMessage,
    showMessage,
    user,
    presence,
  };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

export default MainContext;
