<template>
  <div>
    <Menu />
    <NavApp :title="pageTitle" />
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
      <Table :headers="headers" :data="clients" @row-click="rowClick" />
    </div>
  </div>
</template>

<script>
import Table from '@/components/Table.vue';
import Form from '@/components/clients/Form.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import { api } from '@/utils/api-connect';

export default {
  data() {
    return {
      salon: {},
      allClients: [],
      clients: [],
      defaultClient: {
        name: '',
        photo: '',
        email: '',
        phone: '',
        gender: 'female',
        birthday: '',
        address: '',
        neighborhood: '',
        zip_code: '',
        city: '',
        state: '',
        avatar: undefined,
      },
      client: {},
      headers: [
        {
          name: 'name',
          title: 'Nome',
        }, {
          name: 'phone',
          title: 'Telefone',
        }, {
          name: 'email',
          title: 'Email',
        },
      ],
    };
  },
  props: ['pageTitle'],
  components: {
    Menu,
    NavApp,
    Table,
    Form,
  },
  created() {
    this.client = { ...this.defaultClient };
    this.$emit('set-loading-overlay', true);
    const salon = window.localStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
    this.getClients();
  },
  methods: {
    getClients() {
      api.get(`/salons/${this.salon.id}/clients`)
        .then((response) => {
          this.allClients = response.data;
          this.clients = response.data || [];
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar os clientes deste salão!',
            type: 'is-danger',
          });
        });
    },
    openModalNewClient() {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.saveNewClient,
        },
      ];
      this.client = { ...this.defaultClient };
      this.$emit('open-modal', 'Novo Cliente', Form, this.client, buttons);
    },
    saveNewClient() {
      this.$emit('set-loading-overlay', true);
      const data = new FormData();
      const clientAttributes = Object.keys(this.client);
      for (let i = 0; i < clientAttributes.length; i += 1) {
        data.append(`client[${clientAttributes[i]}]`, this.client[clientAttributes[i]]);
      }
      api.post(`/salons/${this.salon.id}/clients`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          const newClient = response.data;
          this.clients.push(newClient);
          this.client = { ...this.defaultClient };
          this.$emit('set-loading-overlay', false);
          this.$emit('close-modal');
          this.$toast.open({
            message: 'Cliente cadastrado com sucesso.',
            type: 'is-success',
          });
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
    rowClick(client) {
      this.$router.push(`/clients/${client.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.clients {
  height: calc(100vh - 52px);
  padding: 10px;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;

  .top-actions {
    margin-bottom: 0;
    text-align: right;

    .new-client {
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
