'use client';

import { createContext, ReactNode, useCallback, useState } from 'react';

import type {
  MainContextType,
  RequestType,
  ResultType,
  StatusMessageType,
  UserType,
} from '@/types';

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
      errorFn,
    }: RequestType<PayloadType, DataType>): Promise<ResultType<DataType>> => {
      setIsLoading(true);

      try {
        const { status, data } = await apiRequest({ ...payload });

        if (status !== successCode) {
          errorFn && (await errorFn(data as StatusMessageType));
          return [false, data];
        }

        successFn && (await successFn(data as DataType));
        return [true, data];
      } catch (error) {
        const data = { message: 'Algo deu errado!' };
        errorFn && (await errorFn(data));
        return [false, data];
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
