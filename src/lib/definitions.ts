import type { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';

export type InputScheme = { isRequired: boolean; label: string; value: string };

export type User = {
  email: string;
  id: string;
  name: string;
  role: 'admin' | 'collaborator' | 'user';
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
};

export type ConversationExpanded = Conversation & { user?: User };

export type CreateUserPayload = {
  body: { email: string; name: string; password: string };
};

export type LoginPayload = {
  body: { email: string; password: string };
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
  changeStatus: (params: {
    status: ConversationStatus;
  }) => Promise<ContextResult<Conversation>>;
  changeFeedback: (params: {
    feedback: MessageFeedback;
  }) => Promise<ContextResult<Conversation>>;
  conversation: ConversationExpanded;
  conversationLength: number;
  deleteConversation: (params: { id: string }) => Promise<ContextResult<{}>>;
  getHistory: () => Promise<ContextResult<Conversation[]>>;
  getReply: (params: { content: string }) => Promise<ContextResult<Conversation>>;
  history: Conversation[];
  initialConversation: Conversation;
  setConversation: Dispatch<SetStateAction<Conversation>>;
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
  conversation?: ConversationExpanded;
};

export type MainContextProps = {
  children: ReactNode;
  user?: User;
};

export type DropdownProps = { showFn: Dispatch<SetStateAction<boolean>> };

export type HistoryProps = { showFn: Dispatch<SetStateAction<boolean>> };

export type InputGroupProps = {
  name: string;
  scheme: InputScheme;
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
};

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
  conversations: ConversationExpanded[];
};
