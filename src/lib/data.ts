import type { FetchAnswerPayload } from './definitions';

const localUrl = 'http://localhost:3000';

const api = {
  async fetchAnswer({ body }: FetchAnswerPayload) {
    const response = await fetch(`${localUrl}/api/ai/retrieval`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: body.messages }),
    });

    const stream = response.body as ReadableStream<Uint8Array>;
    const reader = stream.getReader();

    return { status: response.status, data: reader };
  },
};

export default api;
