import client from './client';

// Creates a set of CRUD functions for a given backend resource path
// e.g. createResourceApi('projects') -> { getAll, getById, create, update, remove }
export function createResourceApi(resourcePath) {
  return {
    getAll: async () => {
      const res = await client.get(`/${resourcePath}`);
      return res.data.data; // backend wraps results in { success, message, data }
    },
    getById: async (id) => {
      const res = await client.get(`/${resourcePath}/${id}`);
      return res.data.data;
    },
    create: async (payload) => {
      const res = await client.post(`/${resourcePath}`, payload);
      return res.data.data;
    },
    update: async (id, payload) => {
      const res = await client.put(`/${resourcePath}/${id}`, payload);
      return res.data.data;
    },
    remove: async (id) => {
      const res = await client.delete(`/${resourcePath}/${id}`);
      return res.data;
    },
  };
}
