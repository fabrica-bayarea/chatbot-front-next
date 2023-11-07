import {
  ConversationType,
  LoginPayloadType,
  RegisterPayloadType,
  ResponseType,
  StatusMessageType,
  UserType,
} from '@/types';

const URL = 'http://localhost:3001';

const api = {
  async fakeRequest() {
    return new Promise<ResponseType<StatusMessageType>>((resolve, reject) => {
      setTimeout(() => {
        const randomValue = Math.random();

        if (randomValue < 0.5) {
          resolve({ status: 200, data: { message: 'Sucesso!' } });
        } else {
          reject({ status: 500, data: { message: 'Algo deu errado!' } });
        }
      }, 3000);
    });
  },

  async createUser({ body }: RegisterPayloadType): Promise<ResponseType<UserType>> {
    const response = await fetch(`${URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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

  async fetchConversations({
    userId,
  }: {
    userId: string;
  }): Promise<ResponseType<ConversationType[]>> {
    const response = await fetch(`${URL}/conversations/user/${userId}`);
    const data = await response.json();

    return { status: response.status, data };
  },

  // async fetchReply({ messages }) {},

  async login({ body }: LoginPayloadType): Promise<ResponseType<UserType>> {
    const response = await fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return { status: response.status, data };
  },
};

export default api;