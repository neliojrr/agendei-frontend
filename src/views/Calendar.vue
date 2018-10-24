<template>
  <div class="calendar">
    <CalendarHeader
      :employeeSelected="employeeSelected"
      :staff="staff"
      :daySelected="daySelected"
      :showStaffOnHeader="showStaffOnHeader"
      @change-date="changeDate"
      @toggle-staff-on-header="toggleStaffOnHeader"
      @employee-change="employeeChange"
    />
    <a class="button is-link new-appointment-button" title="Novo agendamento">
      <font-awesome-icon icon="plus" />
    </a>
    <div class="agenda-header">
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
    <div class="agenda-body">
      <div
        class="appointments columns is-mobile is-side-gapless"
        v-for="n in timeRows"
        :key="n"
      >
        <div class="column is-1-and-half" v-bind:class="{ 'full-hour': isFullHour(n) }">
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
                  class="booking-description has-text-white has-text-weight-semibold"
                >
                  {{ bookingInfo[getColumnId(n, daySelected, employeeSelected)] }}&nbsp;
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
                  class="booking-description has-text-white has-text-weight-semibold"
                >
                  {{ bookingInfo[getColumnId(n, daySelected, s)] }}&nbsp;
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
            v-bind:class="{
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
                class="booking-description has-text-white has-text-weight-semibold"
              >
                {{ bookingInfo[getColumnId(n, d)] || '' }}&nbsp;
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
import CalendarHeader from '../components/calendar/CalendarHeader.vue';
import log from '../mixins/log';

moment.updateLocale('en', {
  weekdays: [
    'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado',
  ],
  weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
});

export default {
  data() {
    return {
      start: 7,
      end: 24,
      timeRows: (24 - 7) * 4,
      showStaffOnHeader: false,
      daySelected: moment(),
      employeeSelected: null,
      bookingLineSequence: 0,
      staff: [
        {
          id: 1,
          email: 'nelio@agendei.io',
          name: 'Nelio',
          color: 'hsl(141, 71%, 48%)',
          borderColor: 'hsl(141, 71%, 28%)',
        },
        {
          id: 2,
          email: 'gustavo@agendei.io',
          name: 'Gustavo',
          color: 'hsl(171, 100%, 41%)',
          borderColor: 'hsl(171, 100%, 21%)',
        },
        {
          id: 3,
          email: 'salviano@agendei.io',
          name: 'Salviano',
          color: 'hsl(47, 95%, 69%)',
          borderColor: 'hsl(47, 95%, 49%)',
        },
      ],
      daysOfWeek: [],
      bookings: [
        {
          employee: {
            id: 1,
            email: 'nelio@agendei.io',
            name: 'Nelio',
            color: '#23d160',
            borderColor: 'hsl(141, 71%, 28%)',
          },
          client: {
            name: 'João',
          },
          service: {
            title: 'Corte de cabelo',
          },
          start: '2018-10-23 09:45',
          end: '2018-10-23 11:15',
        },
        {
          employee: {
            id: 1,
            email: 'nelio@agendei.io',
            name: 'Nelio',
            color: '#23d160',
            borderColor: 'hsl(141, 71%, 28%)',
          },
          client: {
            name: 'João',
          },
          service: {
            title: 'Sobrancelha',
          },
          start: '2018-10-23 07:00',
          end: '2018-10-23 08:00',
        },
        {
          employee: {
            id: 3,
            email: 'salviano@agendei.io',
            name: 'Salviano',
            color: 'hsl(47, 95%, 69%)',
            borderColor: 'hsl(47, 95%, 49%)',
          },
          client: {
            name: 'João',
          },
          service: {
            title: 'Manicure',
          },
          start: '2018-10-23 14:00',
          end: '2018-10-23 15:15',
        },
        {
          employee: {
            id: 2,
            email: 'gustavo@agendei.io',
            name: 'Gustavo',
            color: 'hsl(171, 100%, 41%)',
            borderColor: 'hsl(171, 100%, 21%)',
          },
          client: {
            name: 'João',
          },
          service: {
            title: 'Corte de cabelo',
          },
          start: '2018-10-23 10:30',
          end: '2018-10-23 12:15',
        },
      ],
      columnsBooked: {},
      bookingInfo: {},
    };
  },
  components: {
    CalendarHeader,
  },
  created() {
    this.fillWeekDays();
  },
  mounted() {
    this.fillColumnsBooked();
  },
  mixins: [log],
  methods: {
    moment(date) {
      return moment(date);
    },
    fillWeekDays(currentDay = moment()) {
      const startOfWeek = moment(currentDay).startOf('week');
      const endOfWeek = moment(currentDay).endOf('week');
      const day = moment(startOfWeek);
      while (day.isSameOrBefore(endOfWeek, 'day')) {
        this.daysOfWeek.push(moment(day));
        day.add(1, 'day');
      }
    },
    changeDate(date) {
      this.daySelected = moment(date);
      this.showStaffOnHeader = true;
      this.fillColumnsBooked();
    },
    toggleStaffOnHeader() {
      this.showStaffOnHeader = !this.showStaffOnHeader;
      this.fillColumnsBooked();
    },
    employeeChange(value) {
      this.employeeSelected = this.staff.find(s => s.id === Number(value));
      this.fillColumnsBooked();
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
    fillColumnsBooked() {
      let { bookings } = this;
      const { employeeSelected, showStaffOnHeader } = this;
      const columnsBooked = {};
      const bookingInfo = {};
      if (employeeSelected) {
        bookings = bookings
          .filter(book => book.employee.id === employeeSelected.id);
      }
      bookings.forEach((book) => {
        const start = moment(book.start);
        const end = moment(book.end);
        let infoOrder = 0;
        while (start.isBefore(end)) {
          const ref = showStaffOnHeader
            ? `${book.employee.id}_${start.format('MM_DD_H_m')}`
            : start.format('MM_DD_H_m');
          bookingInfo[ref] = this.fillBookingInfo(infoOrder, book);
          columnsBooked[ref] = book;
          start.add(15, 'm');
          infoOrder += 1;
        }
      });
      this.columnsBooked = columnsBooked;
      this.bookingInfo = bookingInfo;
    },
    fillBookingInfo(order, book) {
      if (order === 0) {
        return `${moment(book.start).format('H:mm')} - ${moment(book.end).format('H:mm')}`;
      }
      if (order === 1) {
        return book.client.name;
      }
      if (order === 2) {
        return book.service.title;
      }
      return null;
    },
  },
};

</script>

<style lang="scss">
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

.agenda-body {
  height: calc(100vh - 170px);
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 10px;

  .columns:last-child {
    margin-bottom: calc(1.5rem - 0.75rem);
  }

  .columns {

    .column {
      padding-top: 3px;
      padding-bottom: 3px;
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
  font-size: 13px;
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
}

.is-side-gapless {
  margin-left: 0;
  margin-right: 0;
}

.is-1-and-half {
  flex: none;
  width: 12.5%;
}

.calendar {

  .new-appointment-button {
    position: absolute;
    bottom: 25px;
    right: 25px;
    height: 45px;
    width: 45px;
    padding: 0;
    display: flex;
    border-radius: 50%;
    z-index: 10;
  }
}

.booking-description {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
}
</style>
