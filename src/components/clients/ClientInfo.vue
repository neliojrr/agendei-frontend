<template>
  <div class="client-info">
    <div class="card">
      <div class="card-content">
        <div>
          <figure class="image is-128x128">
            <img
              v-if="client.avatar && client.avatar.path"
              class="is-rounded"
              :src="client.avatar.path"
            />
            <div
              v-else
              class="empty-photo has-background-grey-lighter has-text-white has-text-weight-semibold"
            >
              {{ client.name ? client.name.substring(0, 1) : '' }}
            </div>
          </figure>
        </div>
        <div>
          <b-tag type="is-info">
            <b-tooltip label="Agendamentos com status igual a novo">
              {{ appointments ? appointments.length : 0 }} agendamentos
            </b-tooltip>
          </b-tag>
        </div>
        <div class="content">
          <p>{{ client.name }}</p>
          <p>{{ client.email }}</p>
          <p>{{ client.phone }}</p>
        </div>
      </div>
      <footer class="card-footer">
        <button
          type="button"
          class="button is-text card-footer-item new-appointment"
          @click="openModalNewAppointment"
        >
          Agendamento
        </button>
        <button
          type="button"
          @click="$emit('edit-client')"
          class="button is-text card-footer-item edit-client"
        >
          Editar
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import moment from 'moment';
import modalId from '@/utils/modalId';
import { api } from '@/utils/api-connect';
import Form from '../agenda/Form.vue';

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
    }
  },
  data() {
    return {
      format: '24',
      futureAppointments: []
    };
  },
  computed: {
    ...mapState({
      salon: state => state.salon
    })
  },
  methods: {
    ...mapMutations('modal', ['addModal', 'removeModal', 'updateModalProps']),

    saveNewAppointment(data) {
      const { appointment } = data;
      this.$emit('set-loading-overlay', true);
      const startAt = moment.unix(appointment.start_at).format();
      api
        .post(`/salons/${this.salon.id}/appointments`, {
          ...appointment,
          start_at: startAt
        })
        .then(response => {
          const newAppointment = response.data;
          this.appointments.push(newAppointment);
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.NEW_APPOINTMENT });
          this.$toast.open({
            message: 'Agendamento cadastrado!',
            type: 'is-success'
          });
        })
        .catch(error => {
          this.$emit('set-loading-overlay', false);
          let errors = {};
          if (error.response) {
            errors = error.response.data || {};
          } else {
            errors.message = error.message;
          }
          this.errors = errors;
          this.updateModalProps({
            id: modalId.NEW_APPOINTMENT,
            errors: this.errors
          });
        });
    },

    openModalNewAppointment() {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.saveNewAppointment
        }
      ];
      const startDate = moment()
        .hour(0)
        .minute(0)
        .seconds(7 * 3600);
      const appointment = {
        services: {},
        employee: {},
        client: this.client,
        client_id: this.client.id,
        start_at: startDate.unix()
      };
      const data = {
        appointment,
        employees: [],
        start: 7,
        end: 24
      };
      const id = modalId.NEW_APPOINTMENT;
      const props = {
        title: 'Novo Agendamento',
        content: Form,
        data,
        buttons
      };
      this.addModal({ id, props });
    }
  }
};
</script>

<style scoped lang="scss">
@import '~bulma/sass/utilities/_all';
.client-info {
  .card {
    .card-content {
      div {
        margin-bottom: 15px;
      }

      figure {
        margin: auto;

        img {
          height: 128px;
          width: 128px;
        }

        .empty-photo {
          height: 128px;
          width: 128px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 42px;
        }
      }

      .tooltip {
        box-shadow: none;
      }
    }

    .card-footer {
      button {
        height: 98%;
        text-decoration: none;
        border-radius: 0;
      }

      button.new-appointment {
        color: $primary;
      }

      button.edit-client {
        color: $info;
      }

      button:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
