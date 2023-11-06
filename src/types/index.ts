import { ChangeEvent } from 'react';

export type InputSchemeType = {
  [key: string]: { value: string; isRequired: boolean };
};

export type PayloadType = { [key: string]: unknown };

export type LoginBodyType = { email: string; password: string };

export type RegisterBodyType = { email: string; name: string; password: string };

export type MessageType = { message: string };

export type UserType = {
  email: string;
  id?: string;
  name: string;
  password?: string;
};

export type DataType = MessageType | UserType;

export type ResultType = [boolean, DataType];

export type ResponseType = { status: number; data: DataType };

export type RequestType = {
  apiRequest: (payload: PayloadType) => Promise<ResponseType>;
  payload: PayloadType;
  successCode: number;
  successFn: (data: DataType) => void | Promise<void>;
};

export type MainContextType = {
  isLoading: boolean;
  login: (payload: PayloadType) => Promise<ResultType>;
  logout: () => void;
  register: (payload: PayloadType) => Promise<ResultType>;
  user: null | UserType;
};

export type InputGroupProps = {
  label: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  value?: string;
};

export type PasswordInputProps = {
  name: string;
};
