import type {
  APIResult,
  Conversation,
  CreateUserPayload,
  LoginPayload,
  SendEmailPayload,
  SendEmailResponse,
  Session,
  UpdateConversationPayload,
  UpdateWithCompletionPayload,
  User,
} from './definitions';

const jsonUrl = 'http://localhost:3100';
const backUrl = 'http://localhost:3105';
const localUrl = 'http://localhost:3000';

const api = {
  async createUser({ body }: CreateUserPayload): Promise<APIResult<Session>> {
    const response = await fetch(`${backUrl}/auth/signup/usuario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async deleteConversation({ id }: { id: string }): Promise<APIResult<{}>> {
    const response = await fetch(`${jsonUrl}/conversations/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  // async fetchConversation({ id }: { id: string }): Promise<APIResult<Conversation>> {
  //   const response = await fetch(`${jsonUrl}/conversations/${id}?_expand=user`, {
  //     next: { revalidate: 10, tags: ['support'] },
  //   });

  //   const data = await response.json();

  //   return { status: response.status, data };
  // },

  async fetchConversationsByUser({
    userId,
  }: {
    userId: string;
  }): Promise<APIResult<Conversation[]>> {
    const response = await fetch(`${jsonUrl}/conversations?userId=${userId}`);
    const data = await response.json();

    return { status: response.status, data };
  },

  async fetchSupportConversations({
    collaboratorId,
  }: {
    collaboratorId: string;
  }): Promise<APIResult<Conversation[]>> {
    const response = await fetch(
      `${jsonUrl}/conversations/support?collaboratorId=${collaboratorId}&_expand=user`,
      { next: { revalidate: 10, tags: ['support'] } }
    );

    const data = await response.json();

    return { status: response.status, data };
  },

  async login({ body }: LoginPayload): Promise<APIResult<Session>> {
    const response = await fetch(`${backUrl}/auth/signin/usuario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async sendEmail({ body }: SendEmailPayload): Promise<APIResult<SendEmailResponse>> {
    const response = await fetch(`${localUrl}/api/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async updateConversation({
    body,
    id,
  }: UpdateConversationPayload): Promise<APIResult<Conversation>> {
    const response = await fetch(`${jsonUrl}/conversations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async updateWithCompletion({
    body,
  }: UpdateWithCompletionPayload): Promise<APIResult<Conversation>> {
    const response = await fetch(`${jsonUrl}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return { status: response.status, data };
  },
};

export default api;
