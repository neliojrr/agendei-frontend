import { api } from '@/utils/api-connect';
import mutationTypes from '@/constants/mutation-types';

const sale = {
  namespaced: true,
  state: {
    all: [],
    isFetching: false,
    error: null,
  },
  mutations: {
    GET_SALES(state, sales) {
      state.all = sales;
      state.isFetching = false;
    },
    ADD_SALE(state, newSale) {
      state.all.push(newSale);
      state.isFetching = false;
    },
    SALE_REQUEST(state) {
      state.isFetching = true;
    },
    CHECKOUT_SUCCESS(state, newSale) {
      state.isFetching = false;
      state.all.push(newSale);
    },
    CHECKOUT_ERROR(state, error) {
      state.isFetching = true;
      state.error = error;
    },
  },
  actions: {
    async getSales(context, payload) {
      const { salon } = payload;
      try {
        const response = await api.get(`/salons/${salon.id}/sales`);
        const sales = response.data || [];
        context.commit(mutationTypes.GET_SALES, sales);
      } catch (error) {
        let errors = {};
        if (error.response) {
          errors = error.response.data || {};
        } else {
          errors.message = error.message;
        }
        context.commit(mutationTypes.CHECKOUT_ERROR, errors);
        throw new Error(errors);
      }
    },

    async getSale(context, payload) {
      const { saleId } = payload;
      try {
        context.commit(mutationTypes.SALE_REQUEST);
        const response = await api.get(`/sales/${saleId}`);
        const mySale = response.data || [];
        context.commit(mutationTypes.ADD_SALE, mySale);
      } catch (error) {
        let errors = {};
        if (error.response) {
          errors = error.response.data || {};
        } else {
          errors.message = error.message;
        }
        context.commit(mutationTypes.CHECKOUT_ERROR, errors);
        throw new Error(errors);
      }
    },

    async checkout(context, payload) {
      const { salon, sale: saleObject } = payload;
      try {
        const response = await api.post(`salons/${salon.id}/sales/`, { sale: saleObject });
        const newSale = response.data || {};
        context.commit(mutationTypes.ADD_SALE, newSale);
      } catch (error) {
        let errors = {};
        if (error.response) {
          errors = error.response.data || {};
        } else {
          errors.message = error.message;
        }
        context.commit(mutationTypes.CHECKOUT_ERROR, errors);
        throw new Error(errors);
      }
    },
  },
};

export default sale;
