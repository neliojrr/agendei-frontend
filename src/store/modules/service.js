import { api } from '@/utils/api-connect';

const service = {
  namespaced: true,
  state: {
    serviceCategories: []
  },
  mutations: {
    getServiceCategories(state, serviceCategories) {
      state.serviceCategories = serviceCategories;
    },
    addServiceCategory(state, newServiceCategory) {
      state.serviceCategories.push(newServiceCategory);
    },
    addService(state, newService) {
      state.serviceCategories = state.serviceCategories.map(sc => {
        if (sc.id === newService.service_category_id) {
          const serviceCategory = sc;
          serviceCategory.services.push(newService);
          return serviceCategory;
        }
        return sc;
      });
    }
  },
  actions: {
    async getServiceCategories(context, payload) {
      const { salon } = payload;
      try {
        const response = await api.get(
          `/salons/${salon.id}/service_categories`
        );
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
    }
  }
};

export default service;
