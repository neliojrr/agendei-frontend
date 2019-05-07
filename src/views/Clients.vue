<template>
  <div>
    <Menu />
    <NavApp :title="pageTitle" />
    <div class="clients app-content">
      <div class="top-actions columns is-mobile">
        <div class="field client-search column is-half-desktop">
          <div class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Pesquisar um cliente"
              v-model="query"
            />
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
      <Table v-if="clients.length > 0" :headers="headers" :data="clients" @row-click="rowClick" />
      <div v-else class="clients clients-empty">
        <h3 class="subtitle is-5">Não encontramos nenhum cliente.</h3>
        <p>
          <img alt="empty results" title="Nao encontrado" src="../assets/images/empty.svg" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import { mapMutations, mapActions } from 'vuex';
import Table from '@/components/Table.vue';
import Form from '@/components/clients/Form.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import { api } from '@/utils/api-connect';
import modalId from '@/utils/modalId';

export default {
  data() {
    return {
      salon: {},
      query: '',
      clients: [],
      defaultClient: {
        name: '',
        email: '',
        phone: '',
        gender: 'female',
        birth: '',
        address: '',
        neighborhood: '',
        zip_code: '',
        city: '',
        state: '',
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
  watch: {
    query() {
      this.debounceSearch();
    },
  },
  created() {
    this.client = { ...this.defaultClient };
    this.$emit('set-loading-overlay', true);
    this.debounceSearch = debounce(this.search, 500);
    const salon = window.localStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
    this.getClients();
  },
  methods: {
    ...mapActions('client', ['addClient']),
    ...mapMutations('modal', ['addModal', 'removeModal']),

    getClients() {
      api.get(`/salons/${this.salon.id}/clients`)
        .then((response) => {
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
      const id = modalId.NEW_CLIENT;
      const props =
        {
          title: 'Novo Cliente', content: Form, data: this.client, buttons,
        };
      this.addModal({ id, props });
    },

    saveNewClient() {
      this.$emit('set-loading-overlay', true);
      const data = new FormData();
      const clientAttributes = Object.keys(this.client);
      for (let i = 0; i < clientAttributes.length; i += 1) {
        data.append(`client[${clientAttributes[i]}]`, this.client[clientAttributes[i]]);
      }
      this.addClient({ data, salon: this.salon })
        .then((response) => {
          const newClient = response;
          this.clients.push(newClient);
          this.client = { ...this.defaultClient };
          this.removeModal({ id: modalId.NEW_CLIENT });
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Cliente cadastrado com sucesso.',
            type: 'is-success',
          });
        })
        .catch((errors) => {
          this.$emit('set-loading-overlay', false);
          this.errors = errors;
          this.$emit('set-form-errors', this.errors);
        });
    },

    search() {
      this.$emit('set-loading-overlay', true);
      if (this.query && this.query.length > 1) {
        api.get(`/salons/${this.salon.id}/clients/search/${this.query}`)
          .then((response) => {
            this.clients = response.data || [];
            this.$emit('set-loading-overlay', false);
          })
          .catch(() => {
            this.$emit('set-loading-overlay', false);
            this.$toast.open({
              message: 'Não foi possível encontrar os clientes buscados!',
              type: 'is-danger',
            });
          });
      } else {
        this.getClients();
      }
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

  .clients-empty {

    h3 {
      margin-bottom: 50px;
    }

    p {
      height: 60vh;

      img {
        height: 100%;
      }
    }
  }
}
</style>
