<template>
  <section>
    <Menu />
    <NavApp :title="title" />
    <div class="services app-content">
      <div class="top-actions columns is-mobile">
        <div class="field service-search column is-half-desktop">
          <div class="control has-icons-left">
            <input class="input" type="text" placeholder="Pesquisar um serviço">
            <div class="icon is-medium is-left">
              <font-awesome-icon icon="search" />
            </div>
          </div>
        </div>
        <div class="column new-service">
          <button class="button is-info is-hidden-touch">
            <span>Nova Categoria</span>
          </button>
          <button class="button is-primary is-hidden-touch">
            <span>Novo Serviço</span>
          </button>
          <button
            class="button is-primary is-hidden-desktop"
            v-show="!showButtonOptions"
            @click="toggleButtonOptions"
          >
            <span class="is-hidden-desktop">
              <font-awesome-icon icon="plus" />
            </span>
          </button>
          <div v-show="showButtonOptions" class="is-hidden-desktop mobile-buttons">
            <b-tooltip
              label="Nova Categoria"
              position="is-left"
              type="is-black"
              :always="showButtonOptions"
            >
              <button class="button is-info">
                <span>
                  <font-awesome-icon icon="clipboard-list" />
                </span>
              </button>
            </b-tooltip>
          </div>
          <div v-show="showButtonOptions" class="is-hidden-desktop mobile-buttons">
            <b-tooltip
              label="Novo Serviço"
              position="is-left"
              type="is-black"
              :always="showButtonOptions"
            >
              <button class="button is-primary">
                <span>
                  <font-awesome-icon icon="cut" />
                </span>
              </button>
            </b-tooltip>
          </div>
        </div>
      </div>
      <div
        :key="serviceCategory.id"
        v-for="serviceCategory in serviceCategories"
        class="categories"
      >
        <b-collapse
          class="panel"
          :open="categoriesOpened.indexOf(serviceCategory.id) !== -1"
        >
          <div slot="trigger" @click="toggleCategory(serviceCategory.id)" class="panel-heading">
            <span v-if="categoriesOpened.indexOf(serviceCategory.id) !== -1">
              <font-awesome-icon icon="minus" />
            </span>
            <span v-else>
              <font-awesome-icon icon="plus" />
            </span>
            <strong>{{ serviceCategory.name }}</strong>
          </div>
          <div class="panel-block">
            <Table
              :isStriped="true"
              :mobileHidden="0"
              />
          </div>
        </b-collapse>
      </div>
    </div>
  </section>
</template>

<script>
import { api } from '@/utils/api-connect';
import Table from '@/components/Table.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';

export default {
  data() {
    return {
      title: this.pageTitle,
      showButtonOptions: false,
      categoriesOpened: [1],
      serviceCategories: [
        {
          id: 1,
          name: 'Cabelo',
        },
        {
          id: 2,
          name: 'Sobrancelha',
        },
        {
          id: 3,
          name: 'Manicure e Pedicure',
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
  methods: {
    toggleCategory(id) {
      let newIsOpen = [];
      if (this.categoriesOpened.indexOf(id) !== -1) {
        newIsOpen = this.categoriesOpened.filter(i => i !== id);
      } else {
        newIsOpen = this.categoriesOpened.slice(0);
        newIsOpen.push(id);
      }
      this.categoriesOpened = newIsOpen;
    },
    toggleButtonOptions() {
      this.showButtonOptions = !this.showButtonOptions;
    },
  },
};
</script>

<style lang="scss">
.services {
  padding: 10px;

  .top-actions {
    text-align: right;

    .new-service {
      @media screen and (max-width: 1024px) {
        position: fixed;
        bottom: 21px;
        right: 25px;
      }

      button + button {
        margin-left: 10px;
      }

      .mobile-buttons {
        margin-bottom: 10px;
      }

      .mobile-buttons + .mobile-buttons {
        margin-bottom: 0;
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

  .panel-heading {
    text-align: left;

    span {
      margin-right: 20px;
    }
  }

  .categories {
    margin-bottom: 20px;
  }
}
</style>
