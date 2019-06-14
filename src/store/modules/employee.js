import { api } from '@/utils/api-connect';

const employee = {
  namespaced: true,
  state: {
    all: [],
  },
  mutations: {
    addEmployee(state, employee) {
      state.all.push(employee);
    },
    loadEmployees(state, employees) {
      state.all = employees;
    },
  },
  actions: {
    async addEmployee(context, payload) {
      const { salon, data } = payload;
      try {
        const response = await api.post(`/salons/${salon.id}/employees`, { data });
        const newEmployee = response.data;
        context.commit('addEmployee', newEmployee);
        return newEmployee;
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

    async getEmployees(context, payload) {
      const { salon } = payload;
      try {
        const response = await api.get(`/salons/${salon.id}/employees`);
        const employees = response.data || [];
        context.commit('loadEmployees', employees);
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

export default employee;
