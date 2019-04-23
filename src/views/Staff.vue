<template>
  <div>
    <Menu />
    <NavApp :title="pageTitle" />
    <div class="staff app-content">
      <div class="top-actions">
        <div class="column new-staff">
          <button class="button is-primary" @click="openModalNewStaff">
            <span class="is-hidden-touch">Novo Profissional</span>
            <span class="is-hidden-desktop">
              <font-awesome-icon icon="plus" />
            </span>
          </button>
        </div>
      </div>
      <StaffList :data="employees" @edit-employee="editEmployee" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import modalId from '@/utils/modalId';
import { api } from '@/utils/api-connect';
import StaffList from '@/components/staff/StaffList.vue';
import Form from '@/components/staff/Form.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';

export default {
  data() {
    return {
      salon: {},
      data: [],
      allEmployees: [],
      employees: [],
      defaultEmployee: {
        name: '',
        email: '',
        phone: '',
        services: [],
        color: '#ef1554',
        agendei_access: true,
      },
      employee: {},
    };
  },
  props: ['pageTitle'],
  components: {
    Menu,
    NavApp,
    StaffList,
    Form,
  },
  created() {
    this.employee = { ...this.defaultEmployee };
    this.$emit('set-loading-overlay', true);
    const salon = window.localStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
    this.getStaff();
  },
  methods: {
    ...mapMutations('modal', ['addModal', 'removeModal']),

    getStaff() {
      api.get(`/salons/${this.salon.id}/employees`)
        .then((response) => {
          this.allEmployees = response.data;
          this.employees = response.data || [];
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar os profissionais para este salão!',
            type: 'is-danger',
          });
        });
    },

    openModalNewStaff() {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.saveNewEmployee,
        },
      ];
      this.employee = { ...this.defaultEmployee };
      const id = modalId.NEW_STAFF;
      const data = this.employee;
      const props =
        {
          title: 'Novo Profissional', content: Form, data, buttons,
        };
      this.addModal({ id, props });
    },

    saveNewEmployee() {
      this.$emit('set-loading-overlay', true);
      this.employee.service_ids = this.employee.services.map(service => service.id);
      api.post(`/salons/${this.salon.id}/employees`, { employee: this.employee })
        .then((response) => {
          const newEmployee = response.data;
          this.employees.push(newEmployee);
          this.employee = { ...this.defaultEmployee };
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.NEW_STAFF });
        })
        .catch((error) => {
          this.$emit('set-loading-overlay', false);
          let errors = {};
          if (error.response) {
            errors = error.response.data || {};
          } else {
            errors.message = error.message;
          }
          this.errors = errors;
          this.$emit('set-form-errors', this.errors);
        });
    },

    editEmployee(employee) {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.updateEmployee,
        },
        {
          title: 'Deletar',
          class: 'is-danger',
          action: this.deleteEmployee,
        },
      ];
      const data = { ...employee };
      const id = modalId.EDIT_STAFF;
      const props =
        {
          title: 'Editar Profissional', content: Form, data, buttons,
        };
      this.addModal({ id, props });
    },

    deleteEmployee(employee) {
      if (window.confirm('Você tem certeza?')) {
        this.$emit('set-loading-overlay', true);
        api.delete(`/employees/${employee.id}`)
          .then(() => {
            this.employees = this.employees.filter(emp => emp.id !== employee.id);
            this.$toast.open({
              message: 'O profissional foi excluído!',
              type: 'is-success',
            });
            this.$emit('set-loading-overlay', false);
            this.removeModal({ id: modalId.EDIT_STAFF });
          })
          .catch((error) => {
            const message = error && error.response && error.response.data ?
              error.response.data.message :
              null;
            this.$toast.open({
              message: `Impossível deletar este profissional! ${message}`,
              type: 'is-danger',
            });
            this.$emit('set-loading-overlay', false);
          });
      }
    },

    updateEmployee(employee) {
      this.$emit('set-loading-overlay', true);
      const newEmployee = employee;
      newEmployee.service_ids = newEmployee.services.map(service => service.id);
      api.put(`/employees/${employee.id}`, { employee: { ...newEmployee } })
        .then((response) => {
          const updatedEmployee = response.data || {};
          this.employees = this.employees.map((emp) => {
            if (emp.id === updatedEmployee.id) {
              return updatedEmployee;
            }
            return emp;
          });
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.EDIT_STAFF });
        })
        .catch((error) => {
          this.$emit('set-loading-overlay', false);
          let errors = {};
          if (error.response) {
            errors = error.response.data || {};
          } else {
            errors.message = error.message;
          }
          this.errors = errors;
          this.$emit('set-form-errors', this.errors);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.staff {
  height: calc(100vh - 52px);
  padding: 10px;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;

  .top-actions {
    margin-bottom: 0;
    text-align: right;

    .new-staff {
      @media screen and (max-width: 1024px) {
        position: fixed;
        bottom: 21px;
        right: 25px;
      }

      button {
        @media screen and (max-width: 1024px) {
          height: 50px;
          width: 50px;
          padding: 0;
          display: flex;
          border-radius: 50%;
          z-index: 10;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
