<template>
  <div class="appointment-view">
    <h2 class="subtitle is-4">
      {{ moment.unix(data.start_at).format('dddd, DD MMM YYYY') }}
    </h2>
    <div class="columns is-mobile is-vcentered">
      <div class="column is-10-desktop is-10-tablet is-9-mobile">
        <div class="columns is-multiline">
          <p class="column is-12-mobile is-2-desktop is-2-tablet appointment-time">
            {{ moment.unix(data.start_at).format('HH:mm') }}
          </p>
          <p class="column is-8-desktop is-8-tablet appointment-client">
            {{ data.client ? data.client.name : 'Cliente' }}
          </p>
          <p class="column is-8-desktop is-8-tablet is-offset-2 appointment-service">
            {{ duration() }} com
            {{ data.employee ? data.employee.name : 'Profissional' }}
          </p>
        </div>
      </div>
      <div class="column is-2-desktop is-2-tablet is-3-mobile">
        <div class="columns is-multiline">
          <p class="column is-12-mobile is-12-desktop is-2-tablet appointment-price">
            {{ `R$${data.price}` }}
          </p>
          <p class="column is-12-desktop is-12-tablet appointment-service has-text-primary">
            {{ data.status_display }}
          </p>
        </div>
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
    data: {
      type: Object,
      default: () => ({
        service: {},
        client: {},
        employee: {},
        duration: '',
      }),
    },
  },
  computed: {
    moment() {
      return moment;
    },
  },
  methods: {
    duration() {
      return moment.duration(this.data.duration, 's').locale('pt').humanize();
    },
  },
};
</script>

<style lang="scss">
.appointment-view {
  text-align: left;

  .appointment-time {
    font-weight: bold;

    @media screen and (max-width: 768px) {
      padding-bottom: 0;
    }
  }

  .appointment-client {
    font-weight: bold;

    @media screen and (max-width: 768px) {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  .appointment-price {
    font-weight: bold;
    font-size: 18px;
  }

  .appointment-service {
    padding-top: 0;
    @media screen and (max-width: 768px) {
    }
  }
}
</style>
