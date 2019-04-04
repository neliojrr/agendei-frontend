<template>
  <div class="appointment-view">
    <h2 class="subtitle is-4">
      {{ moment.unix(appointment.start_at).format('dddd, DD MMM YYYY') }}
    </h2>
    <div class="columns is-mobile is-vcentered">
      <div class="column is-10-desktop is-10-tablet is-9-mobile">
        <div class="columns is-multiline">
          <p class="column is-12-mobile is-2-desktop is-2-tablet appointment-time">
            {{ moment.unix(appointment.start_at).format('HH:mm') }}
          </p>
          <p class="column is-2-desktop is-2-tablet appointment-client">
            {{ appointment.client ? appointment.client.name : 'Cliente' }}
          </p>
          <p class="column is-8-desktop is-8-tablet is-offset-2 appointment-service">
            {{ this.duration() }} com
            {{ appointment.employee ? appointment.employee.name : 'Profissional' }}
          </p>
        </div>
      </div>
      <p class="column is-2-desktop is-2-tablet is-3-mobile appointment-price">
        {{ `R$${appointment.price}` }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      appointment: this.data.appointment,
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        appointment: {},
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
      return moment.duration(this.appointment.duration, 's').locale('pt').humanize();
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
