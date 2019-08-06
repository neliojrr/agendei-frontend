import Vue from 'vue';
import Vuex from 'vuex';
import modal from './modules/modal';
import client from './modules/client';
import service from './modules/service';
import product from './modules/product';
import employee from './modules/employee';
import sale from './modules/sale';
import report from './modules/report';

Vue.use(Vuex);

/* eslint no-param-reassign: "error" */
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
    sale,
    report
  }
});
