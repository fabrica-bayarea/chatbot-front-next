import { ChangeEvent } from 'react';

export type ChatMessageType = {
  role: 'assistant' | 'user';
  content: string;
  time: number;
};

export type ConversationType = {
  id: string;
  messages: ChatMessageType[];
  status?: 'robot' | 'human' | 'closed';
  userId: string;
};

export type FeedbackType = undefined | 'good' | 'poor';

export type InputSchemeType = { isRequired: boolean; label: string; value: string };

export type StatusMessageType = { message: string };

export type UserType = {
  email: string;
  id: string;
  name: string;
  password?: string;
  role: string;
};

export type SessionType = { token: string; user: UserType };

export type ValidationType = boolean | string;

export type LoginPayloadType = { body: { email: string; password: string } };

export type RegisterPayloadType = {
  body: { email: string; name: string; password: string };
};

export type ReplyPayloadType = { body: ConversationType };

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
  // login: (payload: LoginPayloadType) => Promise<ResultType<UserType>>;
  // logout: () => void;
  makeRequest: <PayloadType, DataType>({
    apiRequest,
    payload,
    successCode,
    successFn,
  }: RequestType<PayloadType, DataType>) => Promise<ResultType<DataType>>;
  // register: (payload: RegisterPayloadType) => Promise<ResultType<UserType>>;
  user: null | UserType;
};

export type ChatContextType = {
  changeConversation: (id: string, messages: ChatMessageType[]) => void;
  deleteConversation: (payload: { id: string }) => Promise<ResultType<{}>>;
  getHistory: () => Promise<ResultType<ConversationType[]>>;
  getReply: (payload: { content: string }) => Promise<ResultType<ConversationType>>;
  history: ConversationType[];
  messages: ChatMessageType[];
};

export type InputGroupProps = {
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  scheme: InputSchemeType;
  type: string;
  value?: string;
};

export type SupportSideBarProps = {
  conversations: (ConversationType & { user: UserType })[];
  user: UserType;
};

export type SupportHeaderProps = {
  conversation: ConversationType & { user: UserType };
};

export type IconButtonProps = {
  $bg?: 'color' | 'white';
  $width?: string;
};

export type ChatMessageProps = {
  $role: 'assistant' | 'error' | 'suggestion' | 'user';
};
