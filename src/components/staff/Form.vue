<template>
  <div class="staff-form">
    <b-tabs v-model="activeTab">
      <b-tab-item label="Detalhes">
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <input
              v-model="employee.name"
              class="input"
              :class="{ 'is-danger': errors.name }"
              type="text"
              placeholder="Lucia Maria"
            >
          </div>
          <p v-for="message in errors.name" :key="message" class="help is-danger">
            {{ message }}
          </p>
        </div>
        <div class="field columns">
          <div class="control is-expanded column">
            <label class="label">Email</label>
            <input
              v-model="employee.email"
              class="input"
              :class="{ 'is-danger': errors.email }"
              type="email"
              placeholder="email@exemplo.com"
            >
            <p v-for="message in errors.email" :key="message" class="help is-danger">
              {{ message }}
            </p>
          </div>
          <div class="control is-expanded column">
            <label class="label">Telefone</label>
            <input
              v-model="employee.phone"
              class="input"
              :class="{ 'is-danger': errors.phone }"
              type="tel"
              placeholder="64999900000"
            >
            <p v-for="message in errors.phone" :key="message" class="help is-danger">
              {{ message }}
            </p>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control is-expanded">
            <label class="label">Acesso</label>
            <b-field>
              <b-switch v-model="employee.agendei_access">Liberar acesso ao Agendei</b-switch>
            </b-field>
          </div>
        </div>
        <div class="field colors">
          <label class="label">Cor na agenda</label>
          <div class="control">
            <div class="columns is-mobile is-multiline colors-list">
              <div
                v-for="(c) in colors"
                :key="c"
                class="column"
              >
                <span
                  class="single-color"
                  @click="changeColor(c)"
                  :style="{ backgroundColor: c }"
                >
                  <font-awesome-icon
                    v-if="employee.color === c"
                    icon="check"
                  />
                </span>
              </div>
            </div>
            <p v-for="message in errors.color" :key="message" class="help is-danger">
              {{ message }}
            </p>
          </div>
        </div>
      </b-tab-item>
      <b-tab-item label="Serviços">
        <div class="content">
          <p class="services-tip">
            Selecione os serviços efetuados por este profissional
          </p>
        </div>
        <div class="field">
          <div class="control is-expanded">
            <label class="checkbox">
              <input
                type="checkbox"
                :checked="employee.services && services.length === employee.services.length"
                @change="toggleAll"
              >
              Selecionar Todos
            </label>
          </div>
        </div>
        <hr />
        <div
          class="field columns is-mobile is-multiline"
          v-if="services.length > 0"
        >
          <div
            class="control is-expanded column is-half"
            v-for="service in services"
            :key="service.id"
          >
            <label class="checkbox" >
              <input
                type="checkbox"
                :checked="employee.services && employee.services.find(s => service.id === s.id)"
                @change="toggleService(service)"
              >
              {{ service.name }}
            </label>
          </div>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { api } from '@/utils/api-connect';

export default {
  data() {
    return {
      employee: this.data,
      salon: {},
      activeTab: 0,
      services: [],
      colors: [
        '#ef1554',
        '#c8e30b',
        '#2350c2',
        '#27c148',
        '#97c3a4',
        '#056bbe',
        '#61f6bc',
        '#4d5795',
        '#769ee9',
        '#7a07a1',
      ],
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    this.$emit('set-loading-overlay', true);
    const salon = window.sessionStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
    this.getServices();
  },
  methods: {
    changeColor(color) {
      this.employee.color = color;
    },
    toggleService(service) {
      const index = this.employee.services.findIndex(s => s.id === service.id);
      if (index > -1) {
        this.employee.services.splice(index, 1);
      } else {
        this.employee.services.push(service);
      }
    },
    toggleAll() {
      if (this.employee.services && this.employee.services.length === this.services.length) {
        this.employee.services = [];
      } else {
        this.employee.services = this.services;
      }
    },
    getServices() {
      api.get(`/salons/${this.salon.id}/services`)
        .then((response) => {
          this.services = response.data;
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar os serviços disponíveis!',
            type: 'is-danger',
          });
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/sass/variables";

.staff-form {
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

  .select-all {
    margin-left: 10px;
    margin-top: 5px;
  }

  .colors {

    .colors-list {
      display: flex;

      .single-color {
        display: inline-block;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        border: 1px solid #DDDDDD;
        color: white;
        cursor: pointer;
      }

      .single-color + .single-color {
        margin-left: 10px;
      }
    }
  }

  .tabs {

    li.is-active {

      a {
        color: $primary !important;
        border-bottom-color: $primary;
      }
    }
  }

  .services-tip {
    color: #888;
  }
}
</style>

