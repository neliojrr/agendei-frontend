<template>
  <div>
    <Menu />
    <NavApp :title="title" />
    <div class="client-view app-content">
      <div class="columns">
        <div class="column is-one-third">
          <ClientInfo :client="client" @edit-client="editClient" />
        </div>
        <div class="column client-sales-column">
          <ClientSales :client="client" />
          <br />
          <ClientHistory :client="client" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/utils/api-connect';
import Table from '@/components/Table.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import ClientInfo from '@/components/clients/ClientInfo.vue';
import ClientSales from '@/components/clients/ClientSales.vue';
import ClientHistory from '@/components/clients/ClientHistory.vue';
import Form from '@/components/clients/Form.vue';

export default {
  data() {
    return {
      client: {
        avatar: {},
      },
      title: this.pageTitle,
    };
  },
  props: ['pageTitle'],
  components: {
    Menu,
    NavApp,
    Table,
    ClientInfo,
    ClientSales,
    ClientHistory,
    Form,
  },
  created() {
    this.$emit('set-loading-overlay', true);
    this.getClient(this.$route.params.id);
  },
  methods: {
    getClient(clientId) {
      api.get(`/clients/${clientId}`)
        .then((response) => {
          this.client = response.data || {};
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar o cliente deste salão!',
            type: 'is-danger',
          });
        });
    },
    editClient() {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.updateClient,
        },
        {
          title: 'Deletar',
          class: 'is-danger',
          action: this.deleteClient,
        },
      ];
      const data = { ...this.client };
      this.$emit('open-modal', 'Editar Cliente', Form, data, buttons);
    },
    updateClient(client) {
      this.$emit('set-loading-overlay', true);
      delete client.salon;
      if (client.avatar && !client.avatar.name) delete client.avatar;
      const data = new FormData();
      const clientAttributes = Object.keys(client);
      for (let i = 0; i < clientAttributes.length; i += 1) {
        data.append(`client[${clientAttributes[i]}]`, client[clientAttributes[i]]);
      }
      api.put(`/clients/${client.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.client = response.data || {};
          this.$emit('set-loading-overlay', false);
          this.$emit('close-modal');
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
    deleteClient(client) {
      if (window.confirm('Você tem certeza?')) {
        this.$emit('set-loading-overlay', true);
        api.delete(`/clients/${client.id}`)
          .then(() => {
            this.$toast.open({
              message: 'O cliente foi excluído!',
              type: 'is-success',
            });
            this.$emit('set-loading-overlay', false);
            this.$emit('close-modal');
            this.$router.replace('/clients');
          })
          .catch((error) => {
            const message = error && error.response && error.response.data ?
              error.response.data.message :
              null;
            this.$toast.open({
              message: `Impossível deletar este cliente! ${message}`,
              type: 'is-danger',
            });
            this.$emit('set-loading-overlay', false);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.client-view {
  height: calc(100vh - 52px);
  padding: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  .client-sales-column {
  }
}
</style>
