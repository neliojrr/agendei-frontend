<template>
  <div>
    <Menu />
    <NavApp :title="title" />
    <div class="client-view app-content">
      <div class="columns">
        <div class="column is-one-third">
          <ClientInfo :client="client" />
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
import api from '@/utils/api-connect';
import Table from '@/components/Table.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import ClientInfo from '@/components/clients/ClientInfo.vue';
import ClientSales from '@/components/clients/ClientSales.vue';
import ClientHistory from '@/components/clients/ClientHistory.vue';

export default {
  data() {
    return {
      client: {},
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
  },
  created() {
    this.title = 'Joana';
    this.salon = JSON.parse(window.sessionStorage.getItem('salon'));
    this.user = JSON.parse(window.sessionStorage.getItem('user'));
    if (this.user && this.salon && this.user.id && this.salon.id) {
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
          this.$toast.open({
            message: 'Não foi possível encontrar o cliente!',
            type: 'is-danger',
          });
        });
    } else {
      this.$router.push('/login');
    }
  },
  methods: {},
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
