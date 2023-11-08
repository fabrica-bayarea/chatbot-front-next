import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type InputSchemeType = { isRequired: boolean; label: string; value: string };

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
  time: number;
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
  makeRequest: <PayloadType, DataType>({
    apiRequest,
    payload,
    successCode,
    successFn,
  }: RequestType<PayloadType, DataType>) => Promise<ResultType<DataType>>;
  register: (payload: RegisterPayloadType) => Promise<ResultType<UserType>>;
  user: null | UserType;
};

export type ChatContextType = {
  messages: ChatMessageType[];
  history: ConversationType[];
  setHistory: Dispatch<SetStateAction<ConversationType[]>>;
  changeConversation: (id: null | string, messages: ChatMessageType[]) => void;
  deleteConversation: (payload: { id: string }) => Promise<ResultType<{}>>;
  getHistory: () => Promise<ResultType<ConversationType[]>>;
};

export type InputGroupProps = {
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  scheme: InputSchemeType;
  type: string;
  value?: string;
};
