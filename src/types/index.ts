import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type ChatMessageType = {
  role: 'assistant' | 'user';
  content: string;
  time: number;
  feedback?: FeedbackType;
};

export type ConversationType = {
  id: undefined | string;
  messages: ChatMessageType[];
  status: 'open';
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
  successCode?: number;
  successFn?: (data: DataType) => void | Promise<void>;
  errorFn?: (data: StatusMessageType) => void | Promise<void>;
};

export type MainContextType = {
  isLoading: boolean;
  makeRequest: <PayloadType, DataType>({
    apiRequest,
    payload,
    successCode,
    successFn,
  }: RequestType<PayloadType, DataType>) => Promise<ResultType<DataType>>;
  user: null | UserType;
};

export type ChatContextType = {
  changeFeedback: (payload: {
    feedback: FeedbackType;
  }) => Promise<ResultType<ConversationType>>;
  conversation: ConversationType;
  conversationLength: number;
  deleteConversation: (payload: { id: string }) => Promise<ResultType<{}>>;
  getHistory: () => Promise<ResultType<ConversationType[]>>;
  getReply: (payload: { content: string }) => Promise<ResultType<ConversationType>>;
  history: ConversationType[];
  setConversation: Dispatch<SetStateAction<ConversationType>>;
  initialConversation: ConversationType;
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

export type ChatMessageProps = {
  $role: 'assistant' | 'error' | 'suggestion' | 'user';
};
