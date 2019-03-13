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
