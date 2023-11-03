import { ResponseType } from '@/types';

const api = {
  async fakeRequest() {
    return new Promise<ResponseType>((resolve, reject) => {
      setTimeout(() => {
        const randomValue = Math.random();

        if (randomValue < 0.5) {
          resolve({ status: 200, data: { message: 'Sucesso!' } });
        } else {
          reject({ status: 404, data: { message: 'Algo deu errado!' } });
        }
      }, 3000);
    });
  },
};

export default api;
