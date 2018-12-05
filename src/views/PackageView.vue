<template>
  <div>
    <Menu />
    <NavApp :title="title" />
    <div class="package-view app-content">
      <div class="columns is-multiline">
        <div class="column is-half">
          <PackageInfo :data="data" />
        </div>
        <div class="column is-half">
          <PackageStatistics :data="data" />
        </div>
        <div class="column is-full package-services-column">
          <PackageServices :data="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api-connect';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import PackageInfo from '@/components/packages/PackageInfo.vue';
import PackageStatistics from '@/components/packages/PackageStatistics.vue';
import PackageServices from '@/components/packages/PackageServices.vue';

export default {
  data() {
    return {
      data: {
        id: 1,
        name: 'Afine-se',
        duration: 123456,
        professionals: [],
        services: [],
      },
      title: this.pageTitle,
    };
  },
  props: ['pageTitle'],
  components: {
    Menu,
    NavApp,
    PackageInfo,
    PackageStatistics,
    PackageServices,
  },
  created() {
    this.title = 'Afine-se';
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
          this.tableData = employees;
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
.package-view {
  padding: 10px;
}
</style>
