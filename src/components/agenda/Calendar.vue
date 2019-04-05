<template>
  <div class="calendar">
    <div class="calendar-header">
      <div
        v-if="showStaffOnHeader"
        class="header columns is-mobile is-side-gapless"
      >
        <div class="column is-1-and-half"></div>
        <template v-if="employeeSelected">
          <div class="column">
            {{ employeeSelected.name }}
          </div>
        </template>
        <template v-else>
          <div v-for="s in staff" :key="s.user" class="column">
            {{ s.name }}
          </div>
        </template>
      </div>
      <div v-else class="header columns is-mobile is-side-gapless">
        <div class="column is-1-and-half"></div>
        <div v-for="d in daysOfWeek" :key="d.format()" class="column">
          {{ d.format('ddd DD') }}
        </div>
      </div>
    </div>
    <div class="calendar-body">
      <div
        class="appointments columns is-mobile is-side-gapless"
        v-for="n in timeRows"
        :key="n"
      >
        <div class="column is-1-and-half" :class="{ 'full-hour': isFullHour(n) }">
          <span v-if="isFullHour(n)">{{ fullHour(n) }}h</span>
        </div>
        <template v-if="showStaffOnHeader">
          <template v-if="employeeSelected">
            <div
              class="column is-booking-type"
              :class="{
                'full-hour': isFullHour(n),
                'is-booked': columnsBooked[getColumnId(n, daySelected, employeeSelected)]
              }"
              :style="!!columnsBooked[getColumnId(n, daySelected, employeeSelected)]
                ? {
                  backgroundColor: columnsBooked[getColumnId(n, daySelected, employeeSelected)].employee.color,
                  borderLeft: `2px solid ${columnsBooked[getColumnId(n, daySelected, employeeSelected)].employee.borderColor}`,
                }
                : {}
              "
            >
              <template
                v-if="!!columnsBooked[getColumnId(n, daySelected, employeeSelected)]"
              >
                <span
                  v-tooltip="{ content: tooltipContent(columnsBooked[getColumnId(n, daySelected, employeeSelected)]) }"
                  class="booking-description"
                >
                  <button
                    @click="$emit('open-modal-checkout', columnsBooked[getColumnId(n, daySelected, employeeSelected)])"
                    class="has-text-white has-text-weight-semibold"
                  >
                    {{ bookingInfo[getColumnId(n, daySelected, employeeSelected)] }}&nbsp;
                  </button>
                </span>
              </template>
              <template v-else>
                <span>&nbsp;</span>
              </template>
            </div>
          </template>
          <template v-else>
            <div
              v-for="s in staff"
              :key="s.id"
              class="column is-booking-type"
              :class="{
                'full-hour': isFullHour(n),
                'is-booked': !!columnsBooked[getColumnId(n, daySelected, s)]
              }"
              :style="!!columnsBooked[getColumnId(n, daySelected, s)]
                ? {
                  backgroundColor: columnsBooked[getColumnId(n, daySelected, s)].employee.color,
                  borderLeft: `2px solid ${columnsBooked[getColumnId(n, daySelected, s)].employee.borderColor}`,
                }
                : {}
              "
            >
              <template
                v-if="columnsBooked[getColumnId(n, daySelected, s)]"
              >
                <span
                  v-tooltip="{ content: tooltipContent(columnsBooked[getColumnId(n, daySelected, s)]) }"
                  class="booking-description has-text-white has-text-weight-semibold"
                >
                  <button
                    @click="$emit('open-modal-checkout', columnsBooked[getColumnId(n, daySelected, s)])"
                    class="has-text-white has-text-weight-semibold"
                  >
                    {{ bookingInfo[getColumnId(n, daySelected, s)] }}&nbsp;
                  </button>
                </span>
              </template>
              <template v-else>
                <span>&nbsp;</span>
              </template>
            </div>
          </template>
        </template>
        <template v-else>
          <div
            class="column is-booking-type"
            :class="{
              'full-hour': isFullHour(n),
              'is-booked': !!columnsBooked[getColumnId(n, d)]
            }"
            v-for="d in daysOfWeek"
            :key="getColumnId(n, d)"
            :style="!!columnsBooked[getColumnId(n, d)]
              ? {
                backgroundColor: columnsBooked[getColumnId(n, d)].employee.color,
                borderLeft: `2px solid ${columnsBooked[getColumnId(n, d)].employee.borderColor}`,
              }
              : {}
            "
          >
            <template
              v-if="!!columnsBooked[getColumnId(n, d)]"
            >
              <span
                v-tooltip="{ content: tooltipContent(columnsBooked[getColumnId(n, d)]) }"
                class="booking-description has-text-white has-text-weight-semibold"
              >
                <button
                  @click="$emit('open-modal-checkout', columnsBooked[getColumnId(n, d)])"
                  class="has-text-white has-text-weight-semibold"
                >
                  {{ bookingInfo[getColumnId(n, d)] || '' }}&nbsp;
                </button>
              </span>
            </template>
            <template v-else>
              <span>&nbsp;</span>
            </template>
          </div>
        </template>
      </div>
      <div class="bottom columns is-mobile"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      timeRows: (this.end - this.start) * 4,
      daysOfWeek: [],
    };
  },
  props: [
    'showStaffOnHeader',
    'employeeSelected',
    'staff',
    'daySelected',
    'appointments',
    'columnsBooked',
    'bookingInfo',
    'start',
    'end',
  ],
  watch: {
    daySelected() {
      this.fillWeekDays(this.daySelected);
    },
  },
  created() {
    this.fillWeekDays();
  },
  methods: {
    moment(date) {
      return moment(date);
    },
    fillWeekDays(currentDay = moment()) {
      const daysOfWeek = [];
      const startOfWeek = moment(currentDay).startOf('week');
      const endOfWeek = moment(currentDay).endOf('week');
      const day = moment(startOfWeek);
      while (day.isSameOrBefore(endOfWeek, 'day')) {
        daysOfWeek.push(moment(day));
        day.add(1, 'day');
      }
      this.daysOfWeek = daysOfWeek;
    },
    isFullHour(rowTime) {
      return ((rowTime - 1) * 15) % 4 === 0;
    },
    fullHour(rowTime) {
      return parseInt(((rowTime - 1) / 4) + this.start, 10);
    },
    fullMinute(rowTime) {
      const quarter = ((rowTime - 1) * 15) % 4;
      return quarter > 0 ? 60 - (quarter * 15) : 0;
    },
    getColumnId(rowTime, header, employee) {
      if (employee) {
        return `${employee.id}_${moment(header).format('MM_DD')}_${this.fullHour(rowTime)}_${this.fullMinute(rowTime)}`;
      }
      return `${moment(header).format('MM_DD')}_${this.fullHour(rowTime)}_${this.fullMinute(rowTime)}`;
    },
    tooltipContent(appointment) {
      if (appointment) {
        return (
          `<div class="columns"><div class="column is-3"><span class="figure">${appointment.client ? appointment.client.name.substr(0, 1) : 'A'}</span></div><div class="column is-9 client-name"><h1 class="subtitle">${appointment.client ? appointment.client.name : 'Desconhecido'}</h1></div></div><div class="columns is-multiline"><div class="column is-9 appointment-time">${moment.unix(appointment.start_at).format('HH:mm')} <span>às</span> ${moment.unix(appointment.start_at).add(appointment.duration, 's').format('HH:mm')}</div><div class="column is-3 appointment-price">${appointment.price}</div><div class="column is-9 appointment-service">${appointment.service.name} <span>com</span> ${appointment.employee.name}</div><div class="column is-3 appointment-status">${appointment.status_display}</div><div class="column is-12 appointment-notes">${appointment.notes || ''}</div></div>`
        );
      }
      return null;
    },
  },
};
</script>

<style lang="scss">
.calendar {
  .columns {

    .column {
      border: 1px solid #cccccc;
      border-right: 0;
      border-bottom: 0;
      padding-left: 5px;
      padding-right: 5px;
    }
    .column:last-child {
      border-right: 1px solid #cccccc;
    }
  }

  .header {
    margin-bottom: 0 !important; // how i'm going to remove this
    margin-top: 5px;

    .column {
      border-bottom: 1px solid #cccccc;
      font-size: 13px;
      font-weight: bold;
    }
  }

  .calendar-body {
    height: calc(100vh - 170px);
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding-top: 10px;

    .columns:last-child {
      margin-bottom: calc(1.5rem - 0.75rem);
    }

    .columns {

      .column {
        padding-top: 3px;
        padding-bottom: 3px;
        min-height: 1.9em;
      }

      .is-booking-type {
        background-size: 8px 8px;
        background-image: linear-gradient(45deg, transparent 46%, rgba(36, 51, 74, .2) 49%, rgba(36, 51, 74, .2) 51%, transparent 55%);
        background-color: #EEF0F2;
      }
    }
  }

  .full-hour {
    border-top: 2px solid #cccccc !important;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
  }

  .bottom {
    border-bottom: 1px solid #cccccc;
  }

  .is-booked {
    background-image: none !important;
    border-bottom: 0 !important;
    border-top: 0 !important;
    overflow: hidden;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .is-side-gapless {
    margin-left: 0;
    margin-right: 0;
  }

  .is-1-and-half {
    flex: none;
    width: 12.5%;
  }

  .booking-description {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    text-align: left;
    font-size: 13px;

    button {
      background: transparent;
      border: 0;
      outline: none;
      font-size: 14px;
      width: 100%;
      text-align: left;
      cursor: pointer;

      @media screen and (max-width: 768px) {
        font-size: 11px;
      }
    }
  }
}
</style>
