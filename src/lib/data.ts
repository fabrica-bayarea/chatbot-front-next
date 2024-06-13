import type {
  APIResult,
  FetchAnswerPayload,
  SendEmailPayload,
  SendEmailResponse,
} from './definitions';

const localUrl = 'http://localhost:3000';

const api = {
  async fetchStream({ body }: FetchAnswerPayload) {
    const response = await fetch(`${localUrl}/api/ai/retrieval`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: body.messages }),
    });

    const stream = response.body as ReadableStream<Uint8Array>;
    const reader = stream.getReader();

    return { status: response.status, data: reader };
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
};

export default api;
