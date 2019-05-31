import { api } from '@/utils/api-connect';

const service = {
  namespaced: true,
  state: {
    serviceCategories: [],
  },
  mutations: {
    getServiceCategories(state, serviceCategories) {
      state.serviceCategories = serviceCategories;
    },
  },
  actions: {
    async getServiceCategories(context, payload) {
      const { salon } = payload;
      try {
        const response = await api.get(`/salons/${salon.id}/service_categories`);
        const serviceCategories = response.data || [];
        context.commit('getServiceCategories', serviceCategories);
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

export default service;
