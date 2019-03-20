<template>
  <div class="appointment-form">
    <Datepicker
      input-class="appointment-date-picker"
      calendar-class="appointment-calendar"
      :language="ptBR"
      :value="getCalendarValue()"
      @selected="changeDate"
    />
    <div class="field">
      <label class="label">Cliente</label>
      <div class="control">
        <b-autocomplete
          v-model="name"
          :data="filteredDataObj"
          :open-on-focus="true"
          ref="autocomplete"
          field="name"
          placeholder="Digite para pesquisar"
          @select="setClient">
          <template slot="header">
            <a>
              <span> Adicionar novo cliente... </span>
            </a>
          </template>
          <template slot="empty">Sem resultados para {{name}}</template>
        </b-autocomplete>
      </div>
      <p v-if="errors.client" class="help is-danger">{{ errors.client }}</p>
    </div>
    <div class="field columns">
      <div class="control column is-3">
        <label class="label">Início</label>
        <div class="select is-fullwidth" :class="{ 'is-danger': errors.start_at }">
          <select v-model="appointment.start_at">
            <option v-for="t in timeRows" :key="t" :value="getTimeInSeconds(t)">
              {{ getDisplayTime(t) }}
            </option>
          </select>
        </div>
        <p v-for="message in errors.start_at" :key="message" class="help is-danger">
          {{ message }}
        </p>
      </div>
      <div class="control column is-9">
        <label class="label">Serviço</label>
        <div class="select is-fullwidth" :class="{ 'is-danger': errors.service }">
          <select v-model="appointment.service" @change="setDuration">
            <optgroup
              v-for="serviceCategory in serviceCategories"
              :key="serviceCategory.id"
              :label="serviceCategory.name"
            >
              <option
                v-for="service in serviceCategory.services"
                :key="service.id"
                :value="service"
              >
                {{ service.name }}
              </option>
            </optgroup>
          </select>
        </div>
        <p v-if="errors.service" class="help is-danger">{{ errors.service }}</p>
      </div>
    </div>
    <div class="field columns">
      <div class="control column is-3">
        <label class="label">Duração</label>
        <div class="select is-fullwidth" :class="{ 'is-danger': errors.duration }">
          <select v-model="appointment.duration">
            <option v-for="d in durationOptions" :key="d.value" :value="d.value">
              {{ d.title }}
            </option>
          </select>
        </div>
        <p v-for="message in errors.duration" :key="message" class="help is-danger">
          {{ message }}
        </p>
      </div>
      <div class="control is-9 column">
        <label class="label">Profissional</label>
        <div class="select is-fullwidth" :class="{ 'is-danger': errors.employee }">
          <select v-model="appointment.employee" @change="setEmployeeId">
            <option v-for="emp in employees" :key="emp.id" :value="emp">
              {{ emp.name }}
            </option>
          </select>
        </div>
        <p v-if="errors.employee" class="help is-danger">{{ errors.employee }}</p>
      </div>
    </div>
    <div class="field">
      <label class="label">Nota</label>
      <textarea
        v-model="appointment.notes"
        class="textarea"
        placeholder="Escreva alguma observação sobre este agendamento">
      </textarea>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { ptBR } from 'vuejs-datepicker/dist/locale';
import moment from 'moment';
import { api } from '@/utils/api-connect';
import serviceDuration from '@/utils/serviceDuration';

export default {
  data() {
    return {
      appointment: this.data.appointment,
      employees: this.data.employees,
      durationOptions: serviceDuration,
      name: '',
      clients: [],
      serviceCategories: [],
      timeRows: (this.data.end - this.data.start) * 4,
      ptBR,
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        appointment: {},
        employees: [],
        start: 7,
        end: 24,
      }),
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Datepicker,
  },
  created() {
    this.$emit('set-loading-overlay', true);
    const salon = window.localStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
    this.getClients();
    this.getServiceCategories();
  },
  computed: {
    filteredDataObj() {
      return this.clients.filter(option => option.name
        .toString()
        .toLowerCase()
        .indexOf(this.name.toLowerCase()) >= 0);
    },
    moment() {
      return moment;
    },
  },
  methods: {
    // Get the time based on the counting between start and end of the day (15 in 15 min)
    getTimeInSeconds(t) {
      const minutes = this.data.start * 60;
      const seconds = (((t - 1) * 15) + minutes) * 60;
      return (this.appointment.start_at ? moment.unix(this.appointment.start_at) : moment()).hour(0).minute(0).second(seconds).unix();
    },
    getDisplayTime(t) {
      const minutes = ((t - 1) * 15) % 60;
      const hours = parseInt((t - 1) / 4, 10) + this.data.start;
      return `${hours}:${minutes === 0 ? '00' : minutes}h`;
    },
    getClients() {
      api.get(`/salons/${this.salon.id}/clients`)
        .then((response) => {
          this.clients = response.data || [];
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar os clientes deste salão!',
            type: 'is-danger',
          });
        });
    },
    getServiceCategories() {
      api.get(`/salons/${this.salon.id}/service_categories`)
        .then((response) => {
          this.serviceCategories = response.data || [];
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar as categorias de serviços!',
            type: 'is-danger',
          });
        });
    },
    setClient(client) {
      this.appointment.client = client;
      this.appointment.client_id = client ? client.id : null;
    },
    setDuration() {
      this.appointment.duration =
        this.appointment.service ? this.appointment.service.duration : null;
      this.appointment.service_id =
        this.appointment.service ? this.appointment.service.id : null;
    },
    setEmployeeId() {
      this.appointment.employee_id =
        this.appointment.employee ? this.appointment.employee.id : null;
    },
    changeDate(date) {
      const momentDate = moment(date);
      const day = momentDate.date();
      const month = momentDate.month();
      const year = momentDate.year();
      const currentPickedDate = this.appointment.start_at ? moment.unix(this.appointment.start_at) : moment();
      const updatedDate = currentPickedDate.date(day).month(month).year(year);
      this.appointment.start_at = updatedDate.unix();
    },
    getCalendarValue() {
      return (this.appointment.start_at ? moment.unix(this.appointment.start_at) : moment()).format('YYYY-MM-DD');
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/sass/variables";

.appointment-form {
  text-align: left;

  .columns {
    margin-bottom: 0;
    margin-top: 0;

    .column {
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 0.75rem;
    }
  }

  .vdp-datepicker {

    div:first-child {
      text-align: center;

      .appointment-date-picker {
        border: 0;
        color: #363636;
        font-size: 1.25rem;
        margin-bottom: 20px;
        text-align: center;
        outline: none;
      }

      .appointment-date-picker:hover {
        text-decoration: underline;
        cursor: pointer;
      }

    }

    .appointment-calendar {
      width: 100% !important;
    }
  }
}
</style>

