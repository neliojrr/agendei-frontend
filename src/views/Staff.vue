<template>
  <div>
    <Menu />
    <NavApp />
    <div class="staff app-content">
      <div class="top-actions">
        <button class="button is-primary">
          Novo Profissional
        </button>
      </div>
      <StaffList :data="data" />
    </div>
  </div>
</template>

<script>
import StaffList from '@/components/staff/StaffList.vue';
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
  components: {
    Menu,
    NavApp,
    StaffList,
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
      api.get(`/salons/${this.salon.id}/employees`, { headers })
        .then((response) => {
          const employees = response.data || [];
          this.data = employees;
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      this.$router.push('/login');
    }
  },
};
</script>

<style lang="scss">
.staff {
  height: calc(100vh - 52px);
  padding: 10px;

  .top-actions {
    text-align: right;
  }
}
</style>
