import Vue from 'vue';
import Vuex from 'vuex';
import modal from './modules/modal';
import client from './modules/client';
import service from './modules/service';
import product from './modules/product';
import employee from './modules/employee';
import sale from './modules/sale';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    salon: {},
    user: {}
  },
  mutations: {
    addSalon(state, salon) {
      state.salon = salon;
    },
    addUser(state, user) {
      state.user = user;
    }
  },
  modules: {
    modal,
    client,
    service,
    product,
    employee,
    sale
  }
});
