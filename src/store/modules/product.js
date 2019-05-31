import { api } from '@/utils/api-connect';

const product = {
  namespaced: true,
  state: {
    productCategories: [],
  },
  mutations: {
    getProductCategories(state, productCategories) {
      state.productCategories = productCategories;
    },
  },
  actions: {
    async getProductCategories(context, payload) {
      const { salon } = payload;
      try {
        const response = await api.get(`/salons/${salon.id}/product_categories`);
        const productCategories = response.data || [];
        context.commit('getProductCategories', productCategories);
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

export default product;
