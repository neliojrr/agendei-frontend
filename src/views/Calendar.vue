<template>
  <section class="calendar">
    <div class="options columns is-mobile">
      <div class="column">
        <div class="control has-icons-left">
          <div class="select">
            <select>
              <option selected>Country</option>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
          <div class="icon is-small is-left">
            <font-awesome-icon icon="user" />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="control has-icons-left">
          <div class="select">
            <select>
              <option selected>Domingo - 15/10</option>
            </select>
          </div>
          <div class="icon is-small is-left">
            <font-awesome-icon icon="calendar-alt" />
          </div>
        </div>
      </div>
    </div>
    <div class="header columns is-mobile">
      <div class="column is-2"></div>
      <div v-for="s in staff" :key="s.user" class="column">
        {{ s.name }}
      </div>
    </div>
    <div class="calendar-body">
      <div
        class="appointments columns is-mobile"
        v-for="n in timeRows"
        :key="n"
      >
      <div class="column is-2" v-bind:class="{ 'full-hour': isFullHour(n) }">
          <span v-if="isFullHour(n)">{{ fullHour(n) }}:00</span>
        </div>
        <div
          class="column"
          v-bind:class="{
            'is-booked': isBooked(n, s.user),
            'full-hour': isFullHour(n)
          }"
          v-for="s in staff"
          :key="s.user"
        ></div>
      </div>
      <div class="bottom columns is-mobile"></div>
    </div>
  </section>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      start: 7,
      end: 24,
      timeRows: (24 - 7) * 4,
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
      bookings: [
        {
          user: 'nelio',
          start: '2018-10-15 9:45',
          end: '2018-10-15 11:15',
        },
        {
          user: 'nelio',
          start: '2018-10-15 7:00',
          end: '2018-10-15 9:15',
        },
        {
          user: 'salviano',
          start: '2018-10-15 14:00',
          end: '2018-10-15 15:15',
        },
        {
          user: 'gustavo',
          start: '2018-10-15 10:30',
          end: '2018-10-15 12:15',
        },
      ],
    };
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
  },
};

</script>

<style lang="scss">
.options {
}

.columns {

  .column {
    border: 1px solid #cccccc;
    border-right: 0;
    border-bottom: 0;
  }
}

.header {
  margin-bottom: 0 !important; // how i'm going to remove this

  .column {
    border-bottom: 1px solid #cccccc;
    font-size: 14px;
  }
}

.calendar-body {
  height: calc(100vh - 95px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 10px;

  .columns:last-child {
    margin-bottom: calc(1.5rem - 0.75rem);
  }
}

.full-hour {
  border-top: 2px solid #cccccc !important;
  padding: 0;
  font-size: 14px;
}

.bottom {
  border-bottom: 1px solid #cccccc;
}

.is-booked {
  background-color: blue;
  border-bottom: 0 !important;
  border-top: 0 !important;
}
</style>
