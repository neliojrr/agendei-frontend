<template>
  <div class="client-history">
    <div class="card">
      <header class="card-header">
        <div class="tabs">
          <ul>
            <li :class="{ 'is-active': tabActive === 'appointments' }">
              <a title="agendamentos" @click.prevent="changeTab('appointments')">
                <span class="icon is-small">
                  <font-awesome-icon icon="calendar-alt" />
                </span>
                <span>Agendamentos</span>
              </a>
            </li>
            <li :class="{ 'is-active': tabActive === 'packages' }">
              <a title="pacotes" @click.prevent="changeTab('packages')">
                <span class="icon is-small">
                  <font-awesome-icon icon="box" />
                </span>
                <span>Pacotes</span>
              </a>
            </li>
            <li :class="{ 'is-active': tabActive === 'products' }">
              <a title="produtos" @click.prevent="changeTab('products')">
                <span class="icon is-small">
                  <font-awesome-icon icon="spray-can" />
                </span>
                <span>Produtos</span>
              </a>
            </li>
          </ul>
        </div>
      </header>
      <div class="card-content">
        <template v-if="tabActive === 'packages'">
          <ClientHistoryPackages :packages="[]" />
        </template>
        <template v-else-if="tabActive === 'products'">
          <ClientHistoryProducts :products="[]" />
        </template>
        <template v-else>
          <ClientHistoryAppointments :appointments="appointments" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ClientHistoryAppointments from './ClientHistoryAppointments.vue';
import ClientHistoryPackages from './ClientHistoryPackages.vue';
import ClientHistoryProducts from './ClientHistoryProducts.vue';

export default {
  data() {
    return {
      tabActive: 'appointments',
      appointments: [
        {
          id: 1,
          date: '2018-11-09 08:00',
          client: {
            id: 1,
            name: 'Nelio Carneiro',
          },
          employee: {
            id: 1,
            name: 'Natalia Rosa',
          },
          service: {
            id: 1,
            name: 'Corte de Cabelo',
          },
          price: 3500,
        },
        {
          id: 2,
          date: '2018-11-08 08:00',
          client: {
            id: 1,
            name: 'Nelio Carneiro',
          },
          employee: {
            id: 1,
            name: 'Natalia Rosa',
          },
          service: {
            id: 1,
            name: 'Maquiagem',
          },
          price: 5500,
        },
        {
          id: 3,
          date: '2018-11-07 08:00',
          client: {
            id: 1,
            name: 'Nelio Carneiro',
          },
          employee: {
            id: 1,
            name: 'Natalia Rosa',
          },
          service: {
            id: 1,
            name: 'Sobrancelha',
          },
          price: 2000,
        },
      ],
    };
  },
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
  components: {
    ClientHistoryAppointments,
    ClientHistoryPackages,
    ClientHistoryProducts,
  },
  methods: {
    changeTab(tab) {
      this.tabActive = tab;
    },
  },
};
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";

.client-history {

  .card {

    .card-content {

      div {
        margin-bottom: 15px;
      }

      .top-columns {
        border-bottom: 1px solid $grey-lighter;

        .column:first-child {
          border-right: 1px solid $grey-lighter;
        }
      }

      .bottom-columns {
        margin-top: 15px;
        margin-bottom: 0;

        .column {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>

