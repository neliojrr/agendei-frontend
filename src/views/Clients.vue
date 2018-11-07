<template>
  <div>
    <Menu />
    <NavApp />
    <div class="clients app-content">
      <div class="top-actions columns is-mobile">
        <div class="field client-search column is-half-desktop">
          <div class="control has-icons-left">
            <input class="input" type="text" placeholder="Pesquisar um cliente">
            <div class="icon is-medium is-left">
              <font-awesome-icon icon="search" />
            </div>
          </div>
        </div>
        <div class="column new-client">
          <button class="button is-primary" @click="openModalNewClient">
            <span class="is-hidden-touch">Novo Cliente</span>
            <span class="is-hidden-desktop"><font-awesome-icon icon="plus" /></span>
          </button>
        </div>
      </div>
      <Table :headers="headers" :data="data" />
    </div>
  </div>
</template>

<script>
import Table from '@/components/Table.vue';
import Form from '@/components/clients/Form.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import api from '@/utils/api-connect';

export default {
  data() {
    return {
      salon: {},
      data: [],
      headers: [
        {
          name: 'name',
          title: 'Nome',
        }, {
          name: 'email',
          title: 'Email',
        }, {
          name: 'phone',
          title: 'Telefone',
        },
      ],
    };
  },
  components: {
    Menu,
    NavApp,
    Table,
    Form,
  },
  created() {
    this.salon = JSON.parse(window.sessionStorage.getItem('salon'));
    this.user = JSON.parse(window.sessionStorage.getItem('user'));
    if (this.user.id && this.salon.id) {
      const headers = {
        'access-token': this.user.token,
        uid: this.user.email,
        client: this.user.client,
      };
      api.get(`/salons/${this.salon.id}/clients`, { headers })
        .then((response) => {
          const employees = response.data || [];
          this.data = employees;
        })
        .catch(() => {
          this.$emit(
            'open-notification',
            'Não foi possível carregar a lista de clientes. Tente recarregar a página!',
            'is-danger',
          );
        });
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    openModalNewClient() {
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
      this.$emit('open-modal', 'Novo Cliente', Form, buttons);
    },
  },
};
</script>

<style lang="scss">
.clients {
  height: calc(100vh - 52px);
  padding: 10px;

  .top-actions {
    margin-bottom: 0;
    text-align: right;

    .new-client {
      @media screen and (max-width: 1024px) {
        position: absolute;
        bottom: 25px;
        right: 25px;
      }

      button {
        @media screen and (max-width: 1024px) {
          height: 45px;
          width: 45px;
          padding: 0;
          display: flex;
          border-radius: 50%;
          z-index: 10;
        }
      }
    }
  }
}
</style>
