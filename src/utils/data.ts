import type {
  APIResult,
  FetchStreamPayload,
  SendEmailPayload,
  SendEmailResponse,
} from './definitions';

const localUrl = 'http://localhost:3000';

const api = {
  async fetchStream({
    body,
  }: FetchStreamPayload): Promise<APIResult<ReadableStreamDefaultReader>> {
    const response = await fetch(`${localUrl}/api/ai/retrieval`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: body.messages }),
    });

    const stream = response.body as ReadableStream;
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
