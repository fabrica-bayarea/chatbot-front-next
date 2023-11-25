'use client';

import { createContext, ReactNode, useCallback, useState } from 'react';

import type { MainContextType, RequestType, ResultType, UserType } from '@/types';

const MainContext = createContext<undefined | MainContextType>(undefined);

export function MainProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: null | UserType;
}) {
  const [isLoading, setIsLoading] = useState(false);

  // Generic function that prepares a request.
  // If successful, execute the passed function, otherwise show an error message.
  const makeRequest = useCallback(
    async <PayloadType, DataType>({
      apiRequest,
      payload,
      successCode,
      successFn,
    }: RequestType<PayloadType, DataType>): Promise<ResultType<DataType>> => {
      setIsLoading(true);

      try {
        const { status, data } = await apiRequest({ ...payload });

        if (status === successCode) {
          await successFn(data as DataType);
          return [true, data];
        }

        return [false, data];
      } catch (error) {
        return [false, { message: 'Algo deu errado!' }];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const shared = { isLoading, makeRequest, user };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

export default MainContext;
