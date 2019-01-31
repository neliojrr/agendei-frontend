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
      <StaffList :data="employees" />
    </div>
  </div>
</template>

<script>
import StaffList from '@/components/staff/StaffList.vue';
import Form from '@/components/staff/Form.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import { api } from '@/utils/api-connect';

export default {
  data() {
    return {
      salon: {},
      data: [],
      allEmployees: [],
      employees: [],
      employee: {
        name: '',
        email: '',
        phone: '',
        services: [],
        color: '',
        access: false,
      },
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
    this.$emit('set-loading-overlay', true);
    const salon = window.sessionStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
    this.getStaff();
  },
  methods: {
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
          action: () => window.alert('Oi'),
        }, {
          title: 'Remover',
          class: 'is-danger',
          action: () => window.confirm('Você tem certeza?'),
        },
      ];
      this.$emit('open-modal', 'Novo Profissional', Form, this.service, buttons);
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
