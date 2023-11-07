import { ChangeEvent } from 'react';

export type InputSchemeType = {
  [key: string]: { value: string; isRequired: boolean };
};

export type LoginPayloadType = { body: { email: string; password: string } };

export type RegisterPayloadType = {
  body: { email: string; name: string; password: string };
};

export type StatusMessageType = { message: string };

export type UserType = {
  email: string;
  id: string;
  name: string;
  password?: string;
};

export type ChatMessageType = {
  role: string;
  content: string;
  time?: number;
};

export type ConversationType = {
  id: string;
  messages: ChatMessageType[];
  userId: string;
};

export type ResultType<DataType> = [boolean, DataType | StatusMessageType];

export type ResponseType<DataType> = {
  status: number;
  data: DataType | StatusMessageType;
};

export type RequestType<PayloadType, DataType> = {
  apiRequest: (payload: PayloadType) => Promise<ResponseType<DataType>>;
  payload: PayloadType;
  successCode: number;
  successFn: (data: DataType) => void | Promise<void>;
};

export type MainContextType = {
  isLoading: boolean;
  login: (payload: LoginPayloadType) => Promise<ResultType<UserType>>;
  logout: () => void;
  register: (payload: RegisterPayloadType) => Promise<ResultType<UserType>>;
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
