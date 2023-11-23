'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

import api from '@/lib/data';
import { statusCodes } from '@/utils';

import type {
  LoginPayloadType,
  MainContextType,
  RegisterPayloadType,
  RequestType,
  ResultType,
  UserType,
} from '@/types';

const MainContext = createContext<undefined | MainContextType>(undefined);

export function MainProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<null | UserType>(null);

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

  // Request functions
  const login = useCallback(
    async (payload: LoginPayloadType) => {
      const successFn = (data: UserType) => {
        setUser(data);
        const expirationTime = new Date().getTime() + 60 * 60 * 1000;
        const dataWithExpiration = { ...data, expirationTime };
        localStorage.setItem('session', JSON.stringify(dataWithExpiration));
      };

      const options = {
        apiRequest: api.login,
        payload,
        successCode: statusCodes.OK,
        successFn,
      };

      return makeRequest<LoginPayloadType, UserType>(options);
    },
    [makeRequest]
  );

  const register = useCallback(
    async (payload: RegisterPayloadType) => {
      const successFn = async (data: UserType) => {};

      const options = {
        apiRequest: api.createUser,
        payload,
        successCode: statusCodes.CREATED,
        successFn,
      };

      return makeRequest<RegisterPayloadType, UserType>(options);
    },
    [makeRequest]
  );

  // Remove user session and redirect to login page
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('session');
    router.push('/login');
  }, [router]);

  // Check the user session. If expired, log out. If it does not exist, redirects to the
  // login page.
  useEffect(() => {
    const localSession = localStorage.getItem('session');

    if (localSession) {
      const parsedSession = JSON.parse(localSession);
      setUser(parsedSession.user);
      const currentTime = new Date().getTime();

      if (currentTime > parsedSession.expirationTime) {
        logout();
      }
    } else if (pathname === '/') {
      router.push('/login');
    }
  }, [logout, pathname, router]);

  const shared = { isLoading, login, logout, makeRequest, register, user };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

export default MainContext;
