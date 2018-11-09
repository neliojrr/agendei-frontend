<template>
  <div class="client-history-appointments">
    <div class="columns is-mobile" v-for="a in appointments" :key="a.id">
      <div class="column date is-narrow">
        <span class="subtitle is-5">
          {{ moment(a.date).format('DD') }}
        </span>
        <div class="subtitle is-5">
          {{ moment(a.date).format('MMM') }}
        </div>
      </div>
      <div class="column time is-flex is-narrow">
        <span class="subtitle is-6">
          {{ moment(a.date).format('H:mm') }}
        </span>
      </div>
      <div class="column service is-flex">
        <span class="subtitle is-6">
          {{ a.service.name }} com {{ a.employee.name}}
        </span>
      </div>
      <div class="column price is-flex is-narrow">
        <span class="subtitle is-5">
          R$ {{ a.price / 100 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {};
  },
  props: {
    appointments: {
      type: Array,
      default: () => [
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
    },
  },
  methods: {
    moment(date) {
      return moment(date);
    },
  },
};
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
.client-history-appointments {

  .columns {
    border-bottom: 1px solid $grey-lighter;

    .column {
      align-items: center;
      justify-content: center;
    }
  }

  .columns:last-child {
    border-bottom: 0;
  }
}
</style>

