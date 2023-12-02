import type { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';

export type InputScheme = { isRequired: boolean; label: string; value: string };

export type User = {
  email: string;
  id: string;
  name: string;
  role: 'admin' | 'collaborator' | 'user';
  imageUrl?: string;
};

export type Session = {
  token: string;
  user: User;
};

export type MessageFeedback = 'good' | 'poor';

export type ConversationMessage = {
  content: string;
  role: 'assistant' | 'collaborator' | 'user';
  time: number;
  feedback?: MessageFeedback;
};

export type ConversationStatus = 'open' | 'redirected' | 'accepted' | 'closed';

export type ConversationSupport = {
  collaboratorId: string;
  messages: ConversationMessage[];
  lastSent?: number;
};

export type Conversation = {
  messages: ConversationMessage[];
  status: ConversationStatus;
  userId: string;
  id?: string;
  support?: ConversationSupport;
  user?: User;
};

export type CreateUserPayload = {
  body: { email: string; imageUrl: string; name: string; password: string };
};

export type LoginPayload = {
  body: { email: string; password: string };
};

export type SendEmailPayload = {
  body: {
    collaboratorName: string;
    email: string;
    id: string;
    messages: ConversationMessage[];
    name: string;
  };
};

export type SendEmailResponse = {
  data: { id: string } | null;
  error: { message: string; name: string } | null;
};

export type UpdateConversationPayload = {
  body: Partial<Conversation>;
  id: string;
};

export type UpdateWithCompletionPayload = { body: Conversation };

export type StatusMessage = { message: string };

export type APIResult<Data> = {
  status: number;
  data: Data | StatusMessage;
};

export type ContextResult<Data> = [boolean, Data | StatusMessage];

export type MakeRequestParams<Payload, Data> = {
  apiRequest: (payload: Payload) => Promise<APIResult<Data>>;
  payload: Payload;
  successCode: number;
  successFn?: (data: Data) => Promise<void>;
  errorFn?: (data: StatusMessage) => Promise<void>;
};

export type RevalidateParams = {
  path?: string;
  tag?: string;
};

export type ChatContextShared = {
  acceptConversation: () => Promise<ContextResult<Conversation>>;
  changeStatus: (status: ConversationStatus) => Promise<ContextResult<Conversation>>;
  changeFeedback: (feedback: MessageFeedback) => Promise<ContextResult<Conversation>>;
  conversation: Conversation;
  conversationLength: number;
  deleteConversation: (id: string) => Promise<ContextResult<{}>>;
  getHistory: () => Promise<ContextResult<Conversation[]>>;
  getReply: (content: string) => Promise<ContextResult<Conversation>>;
  history: Conversation[];
  initialConversation: Conversation;
  sendEmail: () => Promise<ContextResult<SendEmailResponse>>;
  sendReply: (content: string) => Promise<ContextResult<Conversation>>;
  setConversation: Dispatch<SetStateAction<Conversation>>;
  supportLength: number;
};

export type MainContextShared = {
  isLoading: boolean;
  makeRequest: <Payload, Data>({
    apiRequest,
    payload,
    successCode,
    successFn,
    errorFn,
  }: MakeRequestParams<Payload, Data>) => Promise<ContextResult<Data>>;
  user?: User;
};

export type ChatContextProps = {
  children: ReactNode;
  conversation?: Conversation;
};

export type MainContextProps = {
  children: ReactNode;
  user?: User;
};

export type DropdownProps = { showFn: Dispatch<SetStateAction<boolean>> };

export type ElapsedTimeProps = { time: number };

export type EmailTemplateProps = {
  collaboratorName: string;
  id: string;
  messages: ConversationMessage[];
  name: string;
};

export type HistoryProps = { showFn: Dispatch<SetStateAction<boolean>> };

export type InputGroupProps = {
  name: string;
  scheme: InputScheme;
  type: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
};

export type LineBreaksProps = { content: string };

export type PasswordInputProps = { name: string; value: string };

export type RequestButtonProps = {
  children: ReactNode;
  disabled: boolean;
  request: () => Promise<any>;
};

export type SubmitButtonProps = {
  children: ReactNode;
  validation: boolean | string;
};

export type SupportProps = { params: { id: string } };

export type SupportSideBarProps = {
  conversations: Conversation[];
};

export type UploadButtonProps = { children: ReactNode; setFn: (value: string) => void };
