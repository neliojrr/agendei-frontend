<template>
  <div class="menu-header">
    <div class="options columns is-mobile is-variable is-1">
      <div class="column is-3">
        <div class="field">
          <div class="control has-icons-left">
            <div class="select is-medium">
              <select
                :value="employeeSelected ? employeeSelected.id : ''"
                @change="$emit('employee-change', $event.target.value)"
                class="no-padding-left"
              >
                <option value=''>Staff</option>
                <option v-for="u in staff" :value="u.id" :key="u.id">
                  {{ u.name }}
                </option>
              </select>
            </div>
            <div class="icon is-medium is-left">
              <font-awesome-icon icon="user" />
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <div class="control is-medium">
            <Datepicker
              input-class="input is-medium date-picker"
              calendar-class="date-picker-calendar"
              :language="ptBR"
              :value="daySelected.toDate()"
              @selected="changeDate"
            />
          </div>
        </div>
      </div>
      <div class="column is-3">
        <div class="field">
          <div class="control has-icons-left">
            <div class="select is-medium">
              <select class="no-padding-left" @change="$emit('toggle-staff-on-header')">
                <option :selected="!showStaffOnHeader">Semana</option>
                <option :selected="showStaffOnHeader">Dia</option>
              </select>
            </div>
            <div class="icon is-medium is-left">
              <font-awesome-icon icon="calendar-alt" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { ptBR } from 'vuejs-datepicker/dist/locale';

export default {
  data() {
    return {
      ptBR,
    };
  },
  components: {
    Datepicker,
  },
  props: [
    'employeeSelected',
    'staff',
    'daySelected',
    'showStaffOnHeader',
  ],
  methods: {
    changeDate(date) {
      this.$emit('change-date', date);
    },
  },
};
</script>

<style lang="scss">
.menu-header {
  padding: 10px;

  .column {
    border: 0 !important;
  }
}

.options {

  .select {
    width: 100%;

    select {
      width: 100%;

      @media screen and (max-width: 1023px) {
        color: transparent;
      }
    }

    select.no-padding-left {
      @media screen and (max-width: 1023px) {
        padding-left: 0;
      }
    }
  }
}

// Overwriting datepicker input default styles
.date-picker {
  background-color: white !important;
  border-radius: 4px !important;
  margin-bottom: 0 !important;
  padding: 10px !important;
  text-align: center;
  color: #2c3e50;
}

.date-picker-calendar {
  width: 100% !important;

  @media screen and (max-width: 768px) {
    width: 160% !important;
    left: -30%;
  }
}
</style>
