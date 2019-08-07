<template>
  <div class="client-history-appointments">
    <template v-if="appointments.length > 0">
      <div class="columns is-mobile" v-for="a in appointments" :key="a.id">
        <div class="column date is-narrow">
          <span class="subtitle is-5">
            {{ moment(a.start_at).format('DD') }}
          </span>
          <div class="subtitle is-5">
            {{ moment(a.start_at).format('MMM') }}
          </div>
        </div>
        <div class="column time is-flex is-narrow">
          <span class="subtitle is-6">
            {{ moment(a.start_at).format('H:mm') }}
          </span>
        </div>
        <div class="column service is-flex">
          <span class="subtitle is-6">
            {{ `${a.service.name} com ${a.employee.name}` }}
          </span>
        </div>
        <div class="column price is-flex is-narrow">
          <span class="subtitle is-5">{{ displayMoney(a.price || 0) }}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="no-history-message is-centered">
        <p>
          <font-awesome-icon icon="calendar-alt" />
        </p>
        <p class="subtitle is-5">
          Sem histórico de agendamento
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    appointments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    moment(date) {
      return moment.unix(date);
    }
  }
};
</script>

<style scoped lang="scss">
@import '~bulma/sass/utilities/_all';
.client-history-appointments {
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 5px;
  padding-right: 5px;

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

  .no-history-message {
    p {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    svg {
      font-size: 42px;
      color: $grey-light;
    }
  }
}
</style>
