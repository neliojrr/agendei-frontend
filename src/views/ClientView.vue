<template>
  <div>
    <Menu />
    <NavApp :title="title" />
    <div class="client-view app-content">
      <div class="columns">
        <div class="column is-one-third">
          <ClientInfo
            :client="client"
            :appointments="newAppointments"
            @edit-client="editClient"
          />
        </div>
        <div class="column client-sales-column">
          <ClientSales
            :appointments="appointments"
            :statistics="statistics"
            :client="client"
          />
          <br />
          <ClientHistory
            :appointments="appointments"
            :transactions="transactions"
            :client="client"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import AppointmentStatus from '@/utils/AppointmentStatus';
import { api } from '@/utils/api-connect';
import modalId from '@/utils/modalId';
import Table from '@/components/Table.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import ClientInfo from '@/components/clients/ClientInfo.vue';
import ClientSales from '@/components/clients/ClientSales.vue';
import ClientHistory from '@/components/clients/ClientHistory.vue';
import Form from '@/components/clients/Form.vue';

export default {
  components: {
    Menu,
    NavApp,
    Table,
    ClientInfo,
    ClientSales,
    ClientHistory,
    Form
  },
  props: {
    pageTitle: {
      type: String
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      client: {
        avatar: {}
      },
      statistics: {
        prospection: 0,
        salesTotal: 0
      },
      appointments: [],
      newAppointments: [],
      transactions: {
        service: [],
        product: []
      },
      title: this.pageTitle
    };
  },
  computed: {
    ...mapState({
      clients: state => state.client.all,
      salon: state => state.salon
    })
  },
  watch: {
    client() {
      if (this.client.id) {
        this.getStatistics(this.client.id);
        this.getAppointments(this.client.id);
        this.getTransactions(this.client.id);
      }
    }
  },
  created() {
    this.$emit('set-loading-overlay', true);
    this.client = this.clients.find(c => c.id === this.id) || {};
    if (!this.client || !this.client.id) {
      this.getClient(this.id);
    }
  },
  methods: {
    ...mapMutations('client', {
      updateClientStore: 'updateClient',
      deleteClientStore: 'deleteClient'
    }),
    ...mapMutations('modal', ['addModal', 'removeModal', 'updateModalProps']),

    getClient(clientId) {
      api
        .get(`/clients/${clientId}`)
        .then(response => {
          this.client = response.data || {};
          if (this.client.avatar === null) {
            delete this.client.avatar;
          }
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar o cliente deste salão!',
            type: 'is-danger'
          });
        });
    },

    editClient() {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.updateClient
        },
        {
          title: 'Deletar',
          class: 'is-danger',
          action: this.deleteClient
        }
      ];
      const data = { ...this.client };
      const id = modalId.EDIT_CLIENT;
      const props = {
        data,
        buttons,
        title: 'Editar Cliente',
        content: Form
      };
      this.addModal({ id, props });
    },

    updateClient(client) {
      const updatedClient = { ...client };
      this.$emit('set-loading-overlay', true);
      delete updatedClient.salon;
      if (updatedClient.avatar && !updatedClient.avatar.name) {
        delete updatedClient.avatar;
      }
      const data = new FormData();
      const clientAttributes = Object.keys(updatedClient);
      for (let i = 0; i < clientAttributes.length; i += 1) {
        data.append(
          `client[${clientAttributes[i]}]`,
          updatedClient[clientAttributes[i]]
        );
      }
      api
        .put(`/clients/${updatedClient.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
          this.client = response.data || {};
          this.updateClientStore(response.data);
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.EDIT_CLIENT });
        })
        .catch(error => {
          this.$emit('set-loading-overlay', false);
          let errors = {};
          if (error.response) {
            errors = error.response.data || {};
          } else {
            errors.message = error.message;
          }
          this.errors = errors;
          this.updateModalProps({
            id: modalId.EDIT_CLIENT,
            errors: this.errors
          });
        });
    },

    deleteClient(client) {
      if (window.confirm('Você tem certeza?')) {
        this.$emit('set-loading-overlay', true);
        api
          .delete(`/clients/${client.id}`)
          .then(() => {
            this.$toast.open({
              message: 'O cliente foi excluído!',
              type: 'is-success'
            });
            this.deleteClientStore(client.id);
            this.$emit('set-loading-overlay', false);
            this.removeModal({ id: modalId.EDIT_CLIENT });
            this.$router.replace('/clients');
          })
          .catch(error => {
            const message =
              error && error.response && error.response.data
                ? error.response.data.message
                : null;
            this.$toast.open({
              message: `Impossível deletar este cliente! ${message}`,
              type: 'is-danger'
            });
            this.$emit('set-loading-overlay', false);
          });
      }
    },

    getStatistics(clientId) {
      this.$emit('set-loading-overlay', true);
      api
        .get(`/clients/${clientId}/statistics`)
        .then(response => {
          const { data = {} } = response;
          this.statistics = {
            prospection: data.prospection,
            salesTotal: data.sales_total
          };
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível baixar os dados do cliente!',
            type: 'is-danger'
          });
        });
    },

    getAppointments(clientId) {
      this.$emit('set-loading-overlay', true);
      api
        .get(`/clients/${clientId}/appointments`)
        .then(response => {
          const { data = [] } = response;
          this.appointments = data;
          this.newAppointments = this.appointments.filter(
            appointment => appointment.status === AppointmentStatus.NEW
          );
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível baixar os dados do cliente!',
            type: 'is-danger'
          });
        });
    },

    getTransactions(clientId) {
      this.$emit('set-loading-overlay', true);
      api
        .get(`/clients/${clientId}/transactions`)
        .then(response => {
          const { data = {} } = response;
          this.transactions = data;
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível baixar os dados do cliente!',
            type: 'is-danger'
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.client-view {
  height: calc(100vh - 52px);
  padding: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
</style>
