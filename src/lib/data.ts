import type {
  APIResult,
  Conversation,
  ConversationExpanded,
  CreateUserPayload,
  LoginPayload,
  Session,
  UpdateConversationPayload,
  UpdateWithCompletionPayload,
  User,
} from './definitions';

const URL = 'http://localhost:3100';

const api = {
  async createUser({ body }: CreateUserPayload): Promise<APIResult<User>> {
    const response = await fetch(`${URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async login({ body }: LoginPayload): Promise<APIResult<Session>> {
    const response = await fetch(`http://localhost:3100/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async fetchConversation({
    id,
  }: {
    id: string;
  }): Promise<APIResult<ConversationExpanded>> {
    const response = await fetch(`${URL}/conversations/${id}?_expand=user`, {
      next: { revalidate: 10, tags: ['support'] },
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async fetchConversationsByUser({
    userId,
  }: {
    userId: string;
  }): Promise<APIResult<Conversation[]>> {
    const response = await fetch(`${URL}/conversations?userId=${userId}`);
    const data = await response.json();

    return { status: response.status, data };
  },

  async fetchSupportConversations({
    collaboratorId,
  }: {
    collaboratorId: string;
  }): Promise<APIResult<ConversationExpanded[]>> {
    const response = await fetch(
      `${URL}/conversations/support?collaboratorId=${collaboratorId}&_expand=user`,
      { next: { revalidate: 10, tags: ['support'] } }
    );

    const data = await response.json();

    return { status: response.status, data };
  },

  async updateConversation({
    body,
    id,
  }: UpdateConversationPayload): Promise<APIResult<Conversation>> {
    const response = await fetch(`${URL}/conversations/${id}`, {
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
    const response = await fetch(`${URL}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async deleteConversation({ id }: { id: string }): Promise<APIResult<{}>> {
    const response = await fetch(`${URL}/conversations/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    return { status: response.status, data };
  },
};

export default api;
