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
          @select="setClient"
        >
          <template slot="header">
            <a>
              <span> Adicionar novo cliente... </span>
            </a>
          </template>
          <template slot="empty">
            Sem resultados para {{ name }}
          </template>
        </b-autocomplete>
      </div>
      <p v-if="errors.client" class="help is-danger">{{ errors.client }}</p>
    </div>
    <div class="field columns">
      <div class="control column is-3">
        <label class="label">Início</label>
        <div
          class="select is-fullwidth"
          :class="{ 'is-danger': errors.start_at }"
        >
          <select @change="selectStartAt" :value="hourSelected">
            <option v-for="t in timeRows" :key="t" :value="getTimeInSeconds(t)">
              {{ getDisplayTime(t) }}
            </option>
          </select>
        </div>
        <p
          v-for="message in errors.start_at"
          :key="message"
          class="help is-danger"
        >
          {{ message }}
        </p>
      </div>
      <div class="control column is-9">
        <label class="label">Serviço</label>
        <div
          class="select is-fullwidth"
          :class="{ 'is-danger': errors.service }"
        >
          <select v-model="appointment.service" @change="setDurationAndPrice">
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
        <p
          v-for="message in errors.service"
          :key="message"
          class="help is-danger"
        >
          {{ message }}
        </p>
      </div>
    </div>
    <div class="field columns">
      <div class="control column is-3">
        <label class="label">Duração</label>
        <div
          class="select is-fullwidth"
          :class="{ 'is-danger': errors.duration }"
        >
          <select v-model="appointment.duration">
            <option
              v-for="d in durationOptions"
              :key="d.value"
              :value="d.value"
            >
              {{ d.title }}
            </option>
          </select>
        </div>
        <p
          v-for="message in errors.duration"
          :key="message"
          class="help is-danger"
        >
          {{ message }}
        </p>
      </div>
      <div class="control is-9 column">
        <label class="label">Profissional</label>
        <div
          class="select is-fullwidth"
          :class="{ 'is-danger': errors.employee }"
        >
          <select
            :value="appointment.employee ? appointment.employee.id : null"
            @change="setEmployeeId"
          >
            <option v-for="emp in employees" :key="emp.id" :value="emp.id">
              {{ emp.name }}
            </option>
          </select>
        </div>
        <p
          v-for="message in errors.employee"
          :key="message"
          class="help is-danger"
        >
          {{ message }}
        </p>
      </div>
    </div>
    <div class="field">
      <label class="label">Nota</label>
      <textarea
        v-model="appointment.notes"
        class="textarea"
        placeholder="Escreva alguma observação sobre este agendamento"
      />
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { ptBR } from 'vuejs-datepicker/dist/locale';
import { mapState } from 'vuex';
import moment from 'moment';
import serviceDuration from '@/utils/serviceDuration';

export default {
  components: {
    Datepicker
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        appointment: {},
        employees: [],
        start: 7,
        end: 24
      })
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ptBR,
      appointment: this.data.appointment,
      durationOptions: serviceDuration,
      name: '',
      timeRows: (this.data.end - this.data.start) * 4,
      hourSelected: this.data.start * 3600
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      salon: state => state.salon,
      clients: state => state.client.all,
      employees: state => state.employee.all,
      serviceCategories: state => state.service.serviceCategories
    }),
    filteredDataObj() {
      return this.clients.filter(
        option =>
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
      );
    },
    moment() {
      return moment;
    }
  },
  created() {
    if (this.appointment && this.appointment.client) {
      this.name = this.appointment.client.name || '';
    }
    if (this.employees && this.employees.length > 0) {
      if (this.user) {
        this.appointment.employee = this.employees.find(
          employee => employee.id === this.user.id
        );
        this.appointment.employee_id = this.user.id;
      } else {
        this.appointment.employee = this.employees[0];
        this.appointment.employee_id = this.employees[0].id;
      }
    }
  },
  methods: {
    // Get the time based on the counting between start and end of the day (15 in 15 min)
    getTimeInSeconds(t) {
      const minutes = this.data.start * 60;
      return ((t - 1) * 15 + minutes) * 60;
    },

    getDisplayTime(t) {
      const minutes = ((t - 1) * 15) % 60;
      const hours = parseInt((t - 1) / 4, 10) + this.data.start;
      return `${hours}:${minutes === 0 ? '00' : minutes}h`;
    },

    setClient(client) {
      this.appointment.client = client;
      this.appointment.client_id = client ? client.id : null;
    },

    setDurationAndPrice() {
      this.appointment.duration = this.appointment.service
        ? this.appointment.service.duration
        : null;
      this.appointment.service_id = this.appointment.service
        ? this.appointment.service.id
        : null;
      this.appointment.price = this.appointment.service
        ? this.appointment.service.price
        : null;
    },

    setEmployeeId(e) {
      const id = e.target.value;
      this.appointment.employee_id = id;
      this.appointment.employee = this.employees.find(
        emp => emp.id === Number(id)
      );
    },

    changeDate(date) {
      const momentDate = moment(date);
      const day = momentDate.date();
      const month = momentDate.month();
      const year = momentDate.year();
      const currentPickedDate = this.appointment.start_at
        ? moment.unix(this.appointment.start_at)
        : moment();
      const updatedDate = currentPickedDate
        .date(day)
        .month(month)
        .year(year);
      this.appointment.start_at = updatedDate.unix();
    },

    getCalendarValue() {
      return (this.appointment.start_at
        ? moment.unix(this.appointment.start_at)
        : moment()
      ).toDate();
    },

    selectStartAt(e) {
      this.hourSelected = Number(e.target.value);
      this.appointment.start_at = moment
        .unix(this.appointment.start_at)
        .hour(0)
        .minutes(0)
        .seconds(0)
        .seconds(this.hourSelected)
        .unix();
    }
  }
};
</script>

<style lang="scss">
@import '../../assets/sass/variables';

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
