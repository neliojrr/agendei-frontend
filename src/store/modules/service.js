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
    },
    updateServiceCategory(state, serviceCategory) {
      state.serviceCategories = state.serviceCategories.map(sc => {
        if (sc.id === serviceCategory.id) {
          return serviceCategory;
        }
        return sc;
      });
    },
    deleteServiceCategory(state, serviceCategoryId) {
      state.serviceCategories = state.serviceCategories.map(
        sc => sc.id !== serviceCategoryId
      );
    },
    updateService(state, updatedService) {
      state.serviceCategories = state.serviceCategories.map(sc => {
        if (sc.id === updatedService.service_category_id) {
          const serviceCategory = sc;
          const services = serviceCategory.services.map(s => {
            if (s.id === updatedService.id) {
              return updatedService;
            }
            return s;
          });
          serviceCategory.services = services;
          return serviceCategory;
        }
        return sc;
      });
    },
    deleteService(state, deletedService) {
      state.serviceCategories = state.serviceCategories.map(sc => {
        if (sc.id === deletedService.service_category_id) {
          const serviceCategory = sc;
          const services = serviceCategory.services.filter(
            s => s.id !== deletedService.id
          );
          serviceCategory.services = services;
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
