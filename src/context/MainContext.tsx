'use client';
import { createContext, ReactNode, useState } from 'react';

import api from '@/api';
import { statusCodes } from '@/utils';
import type { MainContextType, RequestType, PayloadType, ResultType } from '@/types';

const MainContext = createContext<MainContextType | undefined>(undefined);

export function MainProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  // Generic function that prepares a request.
  // If successful, execute the passed function, otherwise show an error message.
  const makeRequest = async ({
    apiRequest,
    payload,
    successCode,
    successFn,
  }: RequestType): Promise<ResultType> => {
    setIsLoading(true);

    try {
      const { status, data } = await apiRequest({ ...payload });

      if (status === successCode) {
        await successFn(data);
        return [true, data];
      }

      return [false, data];
    } catch (error) {
      return [false, { message: 'Algo deu errado!' }];
    } finally {
      setIsLoading(false);
    }
  };

  // Request functions
  const login = async (payload: PayloadType) => {
    const successFn = (data: unknown) => {};

    const options = {
      apiRequest: api.fakeRequest,
      payload,
      successCode: statusCodes.OK,
      successFn,
    };

    return makeRequest(options);
  };

  const shared = { isLoading, login };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

export default MainContext;
