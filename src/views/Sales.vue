<template>
  <div>
    <Menu />
    <NavApp :title="title" />
    <div class="sales app-content">
      Sales
    </div>
  </div>
</template>

<script>
import api from '@/utils/api-connect';
import Table from '@/components/Table.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';

export default {
  data() {
    return {
      title: this.pageTitle,
    };
  },
  props: ['pageTitle'],
  components: {
    Menu,
    NavApp,
    Table,
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
      api.get(`/salons/${this.salon.id}/transactions`, { headers })
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

<style lang="scss">
.sales {
  height: calc(100vh - 52px);
  padding: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
</style>
