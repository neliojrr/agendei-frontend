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
      <StaffList :data="data" />
    </div>
  </div>
</template>

<script>
import StaffList from '@/components/staff/StaffList.vue';
import Form from '@/components/staff/Form.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import api from '@/utils/api-connect';

export default {
  data() {
    return {
      salon: {},
      data: [],
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
    this.salon = JSON.parse(window.sessionStorage.getItem('salon'));
    this.user = JSON.parse(window.sessionStorage.getItem('user'));
    if (this.user && this.salon && this.user.id && this.salon.id) {
      const headers = {
        'access-token': this.user.token,
        uid: this.user.email,
        client: this.user.client,
      };
      api.get(`/salons/${this.salon.id}/employees`, { headers })
        .then((response) => {
          const employees = response.data || [];
          this.data = employees;
        })
        .catch(() => {
          this.$toast.open({
            message: 'Não foi possível carregar a lista de profissionais. Tente recarregar a página!',
            type: 'is-danger',
          });
        });
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    openModalNewStaff() {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: () => alert('Oi'),
        }, {
          title: 'Remover',
          class: 'is-danger',
          action: () => confirm('Você tem certeza?'),
        },
      ];
      this.$emit('open-modal', 'Novo Profissional', Form, buttons);
    },
  },
};
</script>

<style lang="scss">
.staff {
  height: calc(100vh - 52px);
  padding: 10px;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;

  .top-actions {
    text-align: right;

    .new-staff {
      padding: 0;
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
