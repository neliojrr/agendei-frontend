<template>
  <div class="appointment-form">
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
        <div class="select is-fullwidth" :class="{ 'is-danger': errors.start_at }">
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
        <p v-if="errors.phone" class="help is-danger">{{ errors.service_id }}</p>
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
        <div class="select is-fullwidth" :class="{ 'is-danger': errors.start_at }">
          <select v-model="appointment.employee">
            <option v-for="emp in employees" :key="emp.id" :value="emp">
              {{ emp.name }}
            </option>
          </select>
        </div>
        <p v-if="errors.phone" class="help is-danger">{{ errors.service_id }}</p>
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
  },
  methods: {
    // Get the time based on the counting between start and end of the day (15 in 15 min)
    getTimeInSeconds(t) {
      const minutes = this.data.start * 60;
      return (((t - 1) * 15) + minutes) * 60;
    },
    getDisplayTime(t) {
      const minutes = ((t - 1) * 15) % 60;
      const hours = parseInt(t / 4, 10) + this.data.start;
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
    },
    setDuration() {
      this.appointment.duration =
        this.appointment.service ? this.appointment.service.duration : null;
    },
  },
};
</script>

<style scoped lang="scss">
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
}
</style>

