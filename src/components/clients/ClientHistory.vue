<template>
  <div class="client-history">
    <div class="card">
      <header class="card-header">
        <div class="tabs">
          <ul>
            <li class="is-active">
              <a>
                <span class="icon is-small">
                  <font-awesome-icon icon="calendar-alt" />
                </span>
                <span>Agendamentos</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small">
                  <font-awesome-icon icon="box" />
                </span>
                <span>Pacotes</span>
              </a>
            </li>
            <li>
              <a>
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
        <template v-if="tabActive === 'appointments'">
          <ClientHistoryAppointments />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ClientHistoryAppointments from './ClientHistoryAppointments.vue';

export default {
  data() {
    return {
      tabActive: 'appointments',
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

