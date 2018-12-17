<template>
  <div>
    <Menu />
    <NavApp :title="pageTitle" />
    <div class="packages app-content">
      <div class="top-actions columns is-mobile">
        <div class="field products-search column is-half-desktop">
          <div class="control has-icons-left">
            <input class="input" type="text" placeholder="Pesquisar um pacote">
            <div class="icon is-medium is-left">
              <font-awesome-icon icon="search" />
            </div>
          </div>
        </div>
        <div class="column new-package">
          <button class="button is-primary">
            <span class="is-hidden-touch">Novo Pacote</span>
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
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import { api } from '@/utils/api-connect';

export default {
  data() {
    return {
      salon: {},
      data: [
        {
          id: 1,
          name: 'Afine-se',
          services: 6,
          price: 2000,
        },
        {
          id: 2,
          name: 'Pacote 2',
          services: 2,
          price: 250,
        },
      ],
      headers: [
        {
          name: 'name',
          title: 'Pacote',
        }, {
          name: 'services',
          title: 'Serviços',
        }, {
          name: 'price',
          title: 'Preço',
        },
      ],
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
      api.get(`/salons/${this.salon.id}/clients`, { headers })
        .then((response) => {
          const employees = response.data || [];
          this.data = employees;
        })
        .catch(() => {
          this.$toast.open({
            message: 'Não foi possível carregar a lista de clientes. Tente recarregar a página!',
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
.packages {
  padding: 10px;

  .top-actions {
    margin-bottom: 0;
    text-align: right;

    .new-package {
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
