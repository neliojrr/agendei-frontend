<template>
  <div class="date-selector">
    <div class="field has-addons">
      <p class="control">
        <a class="button is-medium" @click="isYesterday">
          <font-awesome-icon icon="arrow-left" />
        </a>
      </p>
      <p class="control">
        <a class="button is-medium" @click="isToday">
          <span>Hoje</span>
        </a>
      </p>
      <p class="control">
        <a class="button is-medium" @click="toggleDatePicker">
          <font-awesome-icon icon="calendar-alt" />
        </a>
        <Datepicker
          ref="datepicker"
          input-class="is-hidden-desktop is-hidden-touch"
          calendar-class="date-picker-calendar"
          :language="ptBR"
          :value="daySelected.format('YYYY-MM-DD')"
          @selected="changeDate"
        />
      </p>
      <p class="control">
        <a class="button is-medium" @click="isTomorrow">
          <font-awesome-icon icon="arrow-right" />
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { ptBR } from 'vuejs-datepicker/dist/locale';
import moment from 'moment';

export default {
  data() {
    return {
      ptBR,
    };
  },
  props: {
    daySelected: {
      type: Object,
      default: moment(),
    },
  },
  components: {
    Datepicker,
  },
  methods: {
    changeDate(date) {
      this.$emit('change-date', date);
    },
    toggleDatePicker() {
      this.$refs.datepicker.showCalendar();
    },
    isToday() {
      this.$emit('change-date', moment());
    },
    isYesterday() {
      const yesterday = this.daySelected.subtract(1, 'day');
      this.$emit('change-date', yesterday);
    },
    isTomorrow() {
      const tomorrow = this.daySelected.add(1, 'day');
      this.$emit('change-date', tomorrow);
    },
  },
};
</script>


<style lang="scss">
.date-selector {

  .date-picker-calendar {
    left: -15.6em;
  }
}
</style>
