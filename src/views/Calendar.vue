<template>
  <div class="calendar">
    <div class="menu-header">
      <div class="options columns is-mobile is-variable is-1">
        <div class="column is-3">
          <div class="field">
            <div class="control has-icons-left">
              <div class="select is-medium">
                <select class="no-padding-left">
                  <option></option>
                  <option>Staff</option>
                  <option v-for="u in staff" :value="u.user" :key="u.user">
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
              />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <div class="control has-icons-left">
              <div class="select is-medium">
                <select class="no-padding-left">
                  <option value=''></option>
                  <option>Semana</option>
                  <option>Dia</option>
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
    <div class="calendar-header">
      <div
        v-if="showStaffOnHeader"
        class="header columns is-mobile is-side-gapless"
      >
        <div class="column is-1-and-half"></div>
        <div v-for="s in staff" :key="s.user" class="column">
          {{ s.name }}
        </div>
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
        <div class="column is-1-and-half" v-bind:class="{ 'full-hour': isFullHour(n) }">
          <span v-if="isFullHour(n)">{{ fullHour(n) }}h</span>
        </div>
        <div
          class="column"
          v-bind:class="{
            'is-booked': isBooked(n, s.user),
            'is-booking-type': !isBooked(n, s.user),
            'full-hour': isFullHour(n)
          }"
          v-for="(s, index) in (showStaffOnHeader ? staff : daysOfWeek)"
          :key="index"
        >
          &nbsp;
        </div>
      </div>
      <div class="bottom columns is-mobile"></div>
    </div>
  </div>
</template>

<script>
import {ptBR} from 'vuejs-datepicker/dist/locale';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';

moment.updateLocale('en', {
  weekdays: [
    'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado',
  ],
  weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
});

export default {
  data() {
    return {
      ptBR,
      start: 7,
      end: 24,
      timeRows: (24 - 7) * 4,
      showStaffOnHeader: true,
      staff: [
        {
          user: 'nelio',
          name: 'Nelio',
        },
        {
          user: 'gustavo',
          name: 'Gustavo',
        },
        {
          user: 'salviano',
          name: 'Salviano',
        },
      ],
      daysOfWeek: [],
      bookings: [
        {
          user: 'nelio',
          start: '2018-10-20 9:45',
          end: '2018-10-20 11:15',
        },
        {
          user: 'nelio',
          start: '2018-10-20 7:00',
          end: '2018-10-20 8:00',
        },
        {
          user: 'salviano',
          start: '2018-10-20 14:00',
          end: '2018-10-20 15:15',
        },
        {
          user: 'gustavo',
          start: '2018-10-20 10:30',
          end: '2018-10-20 12:15',
        },
      ],
    };
  },
  components: {
    Datepicker,
  },
  created() {
    this.fillWeekDays();
  },
  methods: {
    isFullHour(n) {
      return ((n - 1) * 15) % 4 === 0;
    },
    fullHour(n) {
      return parseInt(((n - 1) / 4) + this.start, 10);
    },
    isBooked(n, user) {
      const quarter = ((n - 1) * 15) % 4;
      const minute = quarter > 0 ? 60 - (quarter * 15) : 0;
      const hour = this.fullHour(n);
      const time = moment().hour(hour).minute(minute); // current date
      const checkBooking = this.bookings.findIndex((book) => {
        if (user === book.user) {
          return time.isBetween(book.start, book.end, null, '[)');
        }
        return false;
      });
      return checkBooking > -1;
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

.menu-header {
  padding: 10px;

  .column {
    border: 0 !important;
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
  height: calc(100vh - 150px);
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
  background-color: blue;
  border-bottom: 0 !important;
  border-top: 0 !important;
}

.is-side-gapless {
  margin-left: 0;
  margin-right: 0;
}

.is-1-and-half {
  flex: none;
  width: 12.5%;
}

.options {

  .select {
    width: 100%;

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
  @media screen and (max-width: 1023px) {
    left: -35%;
  }
}
</style>
