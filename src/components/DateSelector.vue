<template>
  <div class="date-selector">
    <div class="field has-addons">
      <p class="control">
        <button class="button is-medium" @click="isYesterday">
          <font-awesome-icon icon="arrow-left" />
        </button>
      </p>
      <p class="control">
        <button class="button is-medium" @click="isToday">
          <span>Hoje</span>
        </button>
      </p>
      <p class="control">
        <v-date-picker
          mode="range"
          v-model="calendarDate"
          locale="pt-BR"
          :popover="{ placement: 'bottom-end', visibility: 'click' }"
        >
          <button
            slot-scope="{ inputProps, inputEvents, isDragging }"
            v-bind="inputProps"
            v-on="inputEvents"
            class="button is-medium calendar-button"
          >
            <font-awesome-icon icon="calendar-alt" />
          </button>
        </v-date-picker>
      </p>
      <p class="control">
        <button class="button is-medium" @click="isTomorrow">
          <font-awesome-icon icon="arrow-right" />
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    selectedDate: {
      type: Object,
      required: true,
      default: () => ({
        start: moment().toDate(),
        end: moment().toDate()
      })
    }
  },
  data() {
    return {
      calendarDate: this.selectedDate
    };
  },
  watch: {
    calendarDate() {
      this.$emit('change-date', this.calendarDate);
    }
  },
  methods: {
    isToday() {
      this.calendarDate = {
        start: moment().toDate(),
        end: moment().toDate()
      };
    },
    isYesterday() {
      this.calendarDate = {
        start: moment(this.calendarDate.start)
          .subtract(1, 'day')
          .toDate(),
        end: moment(this.calendarDate.start)
          .subtract(1, 'day')
          .toDate()
      };
    },
    isTomorrow() {
      this.calendarDate = {
        start: moment(this.calendarDate.start)
          .add(1, 'day')
          .toDate(),
        end: moment(this.calendarDate.start)
          .add(1, 'day')
          .toDate()
      };
    }
  }
};
</script>

<style lang="scss">
.date-selector {
  button {
    outline: none;
  }

  .calendar-button {
    border: 1px solid #dbdbdb;
  }
}
</style>
