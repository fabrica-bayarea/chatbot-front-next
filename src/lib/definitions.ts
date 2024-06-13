import type { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';
import type { UserMetadata } from '@supabase/supabase-js';

export type InputScheme = { isRequired: boolean; label: string; value: string };

export type User = {
  email: string;
  id: string;
  name: string;
  role: 'admin' | 'collaborator' | 'user';
  imageUrl: string;
};

export type Session = {
  token: string;
  user: User;
};

export type MessageFeedback = 'good' | 'poor';

export type ConversationMessage = {
  role: 'assistant' | 'collaborator' | 'user';
  content: string;
  created_at: string;
  id?: string;
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
  conversation: Conversation;
  conversationLength: number;
  getAnswer: (question: string) => Promise<ContextResult<ReadableStreamDefaultReader>>;
  initialConversation: Conversation;
  isStreaming?: boolean;
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
  message: string;
  setAndShow: (content: string) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  showMessage: boolean;
  user?: UserMetadata;
};

export type ChatContextProps = {
  children: ReactNode;
  conversation?: Conversation;
};

export type MainContextProps = {
  children: ReactNode;
  user?: UserMetadata;
};

export type ChatMessageProps = {
  bgColor?: string;
  children: ReactNode;
  imageUrl?: string;
  name?: string;
  right?: boolean;
};

export type DropdownProps = { showFn: Dispatch<SetStateAction<boolean>> };

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
  data: Conversation[];
};

export type UploadButtonProps = { children: ReactNode; setFn: (value: string) => void };

export type CreateConversationPayload = { body: Conversation };

export type FetchAnswerPayload = { body: { messages: ConversationMessage[] } };

export type UpdateFeedbackPayload = {
  id: string;
  feedback: MessageFeedback;
};

export type UpdateStatusPayload = {
  table: string;
  id: string;
  status: ConversationStatus;
};
