import { api } from '@/utils/api-connect';
import mutationTypes from '@/constants/mutation-types';

/* eslint no-param-reassign: "error" */
const report = {
  namespaced: true,
  state: {
    products: [],
    services: [],
    isFetching: false,
    error: null
  },
  getters: {
    summaryReport: state => {
      const data = [];
      const serviceLine = {
        id: 1,
        name: 'Serviços',
        quantity: 0,
        value: 0
      };
      const productLine = {
        id: 2,
        name: 'Produtos',
        quantity: 0,
        value: 0
      };
      const totalLine = {
        id: 3,
        name: 'Total',
        quantity: 0,
        value: 0
      };
      state.services.forEach(transaction => {
        serviceLine.quantity += transaction.quantity;
        serviceLine.value += transaction.value;
        totalLine.quantity += transaction.quantity;
        totalLine.value += transaction.value;
      });
      state.products.forEach(transaction => {
        productLine.quantity += transaction.quantity;
        productLine.value += transaction.value;
        totalLine.quantity += transaction.quantity;
        totalLine.value += transaction.value;
      });
      data.push(serviceLine, productLine, totalLine);
      return data;
    },
    servicesReport: state => {
      return state.services.reduce(
        (all, transaction) => {
          const service = all[transaction.service_id];
          if (service) {
            service.quantity += transaction.quantity;
            service.value += transaction.value;
          } else {
            all[transaction.service_id] = {
              name: transaction.name,
              quantity: transaction.quantity,
              value: transaction.value,
              id: transaction.id
            };
          }
          all.total.quantity += transaction.quantity;
          all.total.value += transaction.value;
          return all;
        },
        { total: { quantity: 0, value: 0, name: 'Total' } }
      );
    },
    productsReport: state => {
      return state.products.reduce(
        (all, transaction) => {
          const product = all[transaction.product_id];
          if (product) {
            product.quantity += transaction.quantity;
            product.value += transaction.value;
          } else {
            all[transaction.product_id] = {
              name: transaction.name,
              quantity: transaction.quantity,
              value: transaction.value,
              id: transaction.id
            };
          }
          all.total.quantity += transaction.quantity;
          all.total.value += transaction.value;
          return all;
        },
        { total: { quantity: 0, value: 0, name: 'Total' } }
      );
    }
  },
  mutations: {
    GET_PRODUCTS(state, products) {
      state.products = products;
      state.isFetching = false;
    },
    GET_SERVICES(state, services) {
      state.services = services;
      state.isFetching = false;
    },
    GET_PRODUCTS_REQUEST(state) {
      state.isFetching = true;
    },
    GET_SERVICES_REQUEST(state) {
      state.isFetching = true;
    },
    GET_REPORTS_ERROR(state, error) {
      state.isFetching = true;
      state.error = error;
    }
  },
  actions: {
    async getReports(context, payload) {
      const { salon, start, end } = payload;
      try {
        const response = await api.get(`salons/${salon.id}/reports/by-type`, {
          params: {
            start: start.format('YYYY-MM-DD'),
            end: end.format('YYYY-MM-DD')
          }
        });
        const { products, services } = response.data || {};
        context.commit(mutationTypes.GET_PRODUCTS, products);
        context.commit(mutationTypes.GET_SERVICES, services);
      } catch (error) {
        let errors = {};
        if (error.response) {
          errors = error.response.data || {};
        } else {
          errors.message = error.message;
        }
        context.commit(mutationTypes.GET_REPORTS_ERROR, errors);
        throw new Error(errors);
      }
    }
  }
};

export default report;
