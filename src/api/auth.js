import client from './client';

export const authApi = {
  signin: async (email, password) => {
    const res = await client.post('/auth/signin', { email, password });
    return res.data; // { success, message, token, data: user }
  },
};
