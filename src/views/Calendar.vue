<template>
  <div>
    <Menu />
    <NavApp />
    <div class="calendar app-content">
      <CalendarHeader
        :employeeSelected="employeeSelected"
        :staff="staff"
        :daySelected="daySelected"
        :showStaffOnHeader="showStaffOnHeader"
        @change-date="changeDate"
        @toggle-staff-on-header="toggleStaffOnHeader"
        @employee-change="employeeChange"
      />
      <a class="button is-primary new-appointment-button" title="Novo agendamento">
        <font-awesome-icon icon="plus" />
      </a>
      <Agenda
        :employeeSelected="employeeSelected"
        :staff="staff"
        :daySelected="daySelected"
        :showStaffOnHeader="showStaffOnHeader"
        :appointments="appointments"
        :columnsBooked="columnsBooked"
        :bookingInfo="bookingInfo"
        :start="start"
        :end="end"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Menu from '../components/Menu.vue';
import NavApp from '../components/NavApp.vue';
import CalendarHeader from '../components/calendar/CalendarHeader.vue';
import Agenda from '../components/calendar/Agenda.vue';
import log from '../mixins/log';

export default {
  data() {
    return {
      start: 7,
      end: 24,
      showStaffOnHeader: false,
      daySelected: moment(),
      employeeSelected: null,
      columnsBooked: {},
      bookingInfo: {},
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
      appointments: [
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
    };
  },
  components: {
    Menu,
    NavApp,
    CalendarHeader,
    Agenda,
  },
  mixins: [log],
  mounted() {
    this.fillColumnsBooked();
  },
  methods: {
    moment(date) {
      return moment(date);
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
    fillColumnsBooked() {
      let { appointments } = this;
      const { employeeSelected, showStaffOnHeader } = this;
      const columnsBooked = {};
      const bookingInfo = {};
      if (employeeSelected) {
        appointments = appointments
          .filter(book => book.employee.id === employeeSelected.id);
      }
      appointments.forEach((book) => {
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
.calendar {

  .new-appointment-button {
    position: fixed;
    bottom: 21px;
    right: 25px;
    height: 50px;
    width: 50px;
    padding: 0;
    display: flex;
    border-radius: 50%;
    z-index: 10;
    font-size: 18px;
  }
}
</style>
