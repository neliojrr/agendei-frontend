<template>
  <div class="client-sales">
    <div class="card">
      <div class="card-content">
        <div class="columns is-mobile content top-columns">
          <div class="column">
            <p class="heading is-spaced">Vendas Totais</p>
            <p class="subtitle is-5">
              {{ displayMoney(statistics.salesTotal) }}
            </p>
          </div>
          <div class="column">
            <p class="heading is-spaced">Prospecção</p>
            <p class="subtitle is-5">
              {{ displayMoney(statistics.prospection) }}
            </p>
          </div>
        </div>
        <div class="columns is-mobile content bottom-columns">
          <div class="column">
            <p class="heading is-spaced">Total de Agendamentos</p>
            <p class="subtitle is-5">{{ appointments.length }}</p>
          </div>
          <div class="column">
            <p class="heading is-spaced">Finalizados</p>
            <p class="subtitle is-5">{{ this.finishedAppointments.length }}</p>
          </div>
          <div class="column is-hidden-touch">
            <p class="heading is-spaced">Cancelados</p>
            <p class="subtitle is-5">{{ this.canceledAppointments.length }}</p>
          </div>
          <div class="column is-hidden-touch">
            <p class="heading is-spaced">Não compareceu</p>
            <p class="subtitle is-5">{{ this.noShowAppointments.length }}</p>
          </div>
        </div>
        <div class="columns is-mobile content bottom-columns is-hidden-desktop">
          <div class="column">
            <p class="heading is-spaced">Cancelados</p>
            <p class="subtitle is-5">{{ this.canceledAppointments.length }}</p>
          </div>
          <div class="column">
            <p class="heading is-spaced">Não compareceu</p>
            <p class="subtitle is-5">{{ this.noShowAppointments.length }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppointmentStatus from '@/utils/AppointmentStatus';

export default {
  props: {
    client: {
      type: Object,
      required: true
    },
    appointments: {
      type: Array,
      required: false,
      default: () => []
    },
    statistics: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  computed: {
    finishedAppointments() {
      return this.appointments.filter(
        appointment => appointment.status === AppointmentStatus.COMPLETED
      );
    },
    canceledAppointments() {
      return this.appointments.filter(
        appointment => appointment.status === AppointmentStatus.CANCELED
      );
    },
    noShowAppointments() {
      return this.appointments.filter(
        appointment => appointment.status === AppointmentStatus.NO_SHOW
      );
    }
  }
};
</script>

<style scoped lang="scss">
@import '~bulma/sass/utilities/_all';
.client-sales {
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
