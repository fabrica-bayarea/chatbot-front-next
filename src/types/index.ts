import { ChangeEvent } from 'react';

export type InputSchemeType = {
  [key: string]: { value: string; isRequired: boolean };
};

export type InputValuesType = {
  [key: string]: string;
};

export type DataType = { message: string };

export type PayloadType = { [key: string]: unknown };

export type ResultType = [boolean, DataType];

export type ResponseType = { status: number; data: DataType };

export type RequestType = {
  apiRequest: (payload: PayloadType) => Promise<ResponseType>;
  payload: PayloadType;
  successCode: number;
  successFn: (data: DataType) => unknown | Promise<unknown>;
};

export type InputGroupProps = {
  label: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
};

export type PasswordInputProps = {
  name: string;
};

export type MainContextType = {
  isLoading: boolean;
  login: (payload: PayloadType) => Promise<ResultType>;
};
