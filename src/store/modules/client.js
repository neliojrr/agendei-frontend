import { api } from '@/utils/api-connect';

const client = {
  namespaced: true,
  state: {
    all: []
  },
  mutations: {
    addClient(state, newClient) {
      state.all.push(newClient);
    },
    loadClients(state, clients) {
      state.all = clients;
    }
  },
  actions: {
    async addClient(context, payload) {
      const { salon, data } = payload;
      try {
        const response = await api.post(`/salons/${salon.id}/clients`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
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
    async getClients(context, payload) {
      const { salon } = payload;
      try {
        const response = await api.get(`/salons/${salon.id}/clients`);
        const clients = response.data || [];
        context.commit('loadClients', clients);
      } catch (error) {
        let errors = {};
        if (error.response) {
          errors = error.response.data || {};
        } else {
          errors.message = error.message;
        }
        throw new Error(errors);
      }
    }
  }
};

export default client;
