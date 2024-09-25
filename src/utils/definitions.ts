import type { Dispatch, SetStateAction } from 'react';

export type MessageFeedback = 'good' | 'poor';

export type MessageRole = 'assistant' | 'collaborator' | 'user';

export type UserRole = 'admin' | 'collaborator' | 'user';

export type ConversationStatus = 'open' | 'redirected';

export type SupportStatus = 'open' | 'accepted' | 'closed';

export interface Profile {
  id: string;
  email: string;
  name: string;
  picture: string;
  role: UserRole;
}

export interface Message {
  id: string;
  conversation_id: string;
  content: string;
  created_at: string;
  role: MessageRole;
  owner_profile: Profile | null;
}

export interface Conversation {
  id: string;
  owner_id: string;
  created_at: string;
  status: ConversationStatus;
  messages: Message[];
}

export interface Support {
  id: string;
  conversation_id: string;
  created_at: string;
  status: SupportStatus;
  accepted_at: string | null;
  accepted_by: string | null;
  closed_at: string | null;
  closed_by: string | null;
  last_sent_at: string | null;
  messages: Message[];
  owner_profile: Profile;
}

export type InputScheme = { isRequired: boolean; label: string; value: string };

export type FetchStreamPayload = { body: { messages: Message[] } };

export type SendEmailPayload = {
  body: {
    id: string;
    collaboratorProfile: Profile;
    ownerProfile: Profile;
    messages?: Message[];
    status?: SupportStatus;
    template: 'end-of-support' | 'support-update';
  };
};

export type SendEmailResponse = {
  data: { id: string } | null;
  error: { message: string; name: string } | null;
};

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
  user: Profile;
};

export type ChatContextShared = {
  conversation: Conversation;
  getStream: (question: string) => Promise<ContextResult<ReadableStreamDefaultReader>>;
  isStreaming?: boolean;
  newConversation: Conversation;
  setConversation: Dispatch<SetStateAction<Conversation>>;
};

export type FilteredAnalyticsData = {
  closedSupportChart: {
    total: {
      porcentage: number;
      value: number;
    };
    own: {
      porcentage: number;
      value: number;
    };
  };
  generalComparisonChart: {
    general: number[];
    own: (number | null)[];
  };
  statusUpdateChart: {
    openSupport: number[];
    closedSupport: number[];
  };
};

export type AnalyticsData = {
  [key: string]: FilteredAnalyticsData;
};

export type AnalyticsContextShared = {
  analytics: AnalyticsData;
  colors: { [key: string]: string };
  filteredData: FilteredAnalyticsData;
  setFilter: Dispatch<SetStateAction<string>>;
};
