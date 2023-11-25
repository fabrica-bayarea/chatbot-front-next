import {
  ConversationType,
  LoginPayloadType,
  RegisterPayloadType,
  ReplyPayloadType,
  ResponseType,
  SessionType,
  UserType,
} from '@/types';

const URL = 'http://localhost:3100';

const api = {
  async createUser({ body }: RegisterPayloadType): Promise<ResponseType<UserType>> {
    const response = await fetch(`${URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async deleteConversation({ id }: { id: string }): Promise<ResponseType<{}>> {
    const response = await fetch(`${URL}/conversations/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async fetchConversation({ id }: { id: string }) {
    const response = await fetch(`${URL}/conversations/${id}?_expand=user`, {
      next: { revalidate: 10 },
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async fetchConversations({
    userId,
  }: {
    userId: string;
  }): Promise<ResponseType<ConversationType[]>> {
    const response = await fetch(`${URL}/conversations/user/${userId}`);
    const data = await response.json();

    return { status: response.status, data };
  },

  async fetchHumanConversations() {
    const response = await fetch(
      'http://localhost:3100/conversations?status=human&_expand=user',
      { next: { revalidate: 10 } }
    );

    const data = await response.json();

    return { status: response.status, data };
  },

  async fetchReply({ body }: ReplyPayloadType): Promise<ResponseType<ConversationType>> {
    const response = await fetch(`${URL}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return { status: response.status, data };
  },

  async login({ body }: LoginPayloadType): Promise<ResponseType<SessionType>> {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await response.json();

    return { status: response.status, data };
  },
};

export default api;
