import { api } from '@/utils/api-connect';

const client = {
  namespaced: true,
  state: {
    all: [],
  },
  mutations: {
    addClient(state, client) {
      state.all.push(client);
    },
  },
  actions: {
    async addClient(context, payload) {
      const { salon, data } = payload;
      try {
        const response = await api.post(`/salons/${salon.id}/clients`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
        const newClient = response.data;
        context.commit('addClient', newClient);
        return newClient;
      } catch (error) {
        let errors = {};
        if (error.response) {
          errors = error.response.data || {};
        } else {
          errors.message = error.message;
        }
        throw new Error(errors);
      }
    },
  },
};

export default client;
