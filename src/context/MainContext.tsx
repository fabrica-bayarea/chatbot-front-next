'use client';

import { createContext, ReactNode, useCallback, useState } from 'react';

import {
  ContextResult,
  MainContextShared,
  MakeRequestParams,
  Profile,
  StatusMessage,
} from '@/utils/definitions';

const MainContext = createContext<MainContextShared | undefined>(undefined);

export function MainProvider({ children, user }: { children: ReactNode; user: Profile }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Generic function that prepares a request.
  // If successful, execute the passed function, otherwise show an error message.
  const makeRequest = useCallback(
    async <Payload, Data>({
      apiRequest,
      errorFn,
      payload,
      successCode,
      successFn,
    }: MakeRequestParams<Payload, Data>): Promise<ContextResult<Data>> => {
      setIsLoading(true);

      try {
        const { status, data } = await apiRequest({ ...payload });

        if (status !== successCode) {
          errorFn && (await errorFn(data as StatusMessage));

          return [false, data];
        }

        successFn && (await successFn(data as Data));

        return [true, data];
      } catch (error) {
        console.log(error);
        const data = { message: 'Algo deu errado!' };
        errorFn && (await errorFn(data));

        return [false, data];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const setAndShow = (content: string) => {
    setMessage(content);
    setShowMessage(true);
  };

  const shared: MainContextShared = {
    isLoading,
    makeRequest,
    message,
    setAndShow,
    setIsLoading,
    setShowMessage,
    showMessage,
    user,
  };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

export default MainContext;
