'use client';

import { createContext, useCallback, useState } from 'react';

import {
  ContextResult,
  MainContextProps,
  MainContextShared,
  MakeRequestParams,
  StatusMessage,
} from '@/lib/definitions';

const MainContext = createContext<MainContextShared | undefined>(undefined);

export function MainProvider({ children, user }: MainContextProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Generic function that prepares a request.
  // If successful, execute the passed function, otherwise show an error message.
  const makeRequest = useCallback(
    async <Payload, Data>({
      apiRequest,
      payload,
      successCode,
      successFn,
      errorFn,
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

  const shared: MainContextShared = { isLoading, makeRequest, user };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

export default MainContext;
