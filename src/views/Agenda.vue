<template>
  <div>
    <Menu />
    <NavApp :title="pageTitle" />
    <div class="agenda app-content">
      <CalendarHeader
        :employeeSelected="employeeSelected"
        :staff="employees"
        :daySelected="daySelected"
        :showStaffOnHeader="showStaffOnHeader"
        @change-date="changeDate"
        @toggle-staff-on-header="toggleStaffOnHeader"
        @employee-change="employeeChange"
      />
      <button
        class="button is-primary new-appointment-button"
        title="Novo agendamento"
        @click="openModalNewAppointment"
      >
        <font-awesome-icon icon="plus" />
      </button>
      <Calendar
        :employeeSelected="employeeSelected"
        :staff="employees"
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
import { api } from '@/utils/api-connect';
import Menu from '../components/Menu.vue';
import NavApp from '../components/NavApp.vue';
import CalendarHeader from '../components/agenda/CalendarHeader.vue';
import Calendar from '../components/agenda/Calendar.vue';
import Form from '../components/agenda/Form.vue';
import log from '../mixins/log';

/**
 * Default appointment

  {
    employee: {
      id: 1,
      email: 'nelio@agendei.io',
      name: 'Nelio',
      color: '#23d160',
      borderColor: 'hsl(141, 71%, 28%)',
    },
    client: {
      id: 1,
      name: 'João',
    },
    service: {
      id: 1,
      title: 'Corte de cabelo',
    },
    start: '2018-11-12 07:30',
    end: '2018-11-12 08:45',
  }
*/

export default {
  data() {
    return {
      start: 7,
      end: 24,
      showStaffOnHeader: true,
      daySelected: moment(),
      employeeSelected: null,
      columnsBooked: {},
      bookingInfo: {},
      employees: [],
      appointments: [],
      defaultAppointment: {
        service: {},
        client: {},
        employee: {},
      },
      appointment: {},
    };
  },
  props: ['pageTitle'],
  components: {
    Menu,
    NavApp,
    CalendarHeader,
    Calendar,
  },
  mixins: [log],
  created() {
    this.appointment = { ...this.defaultAppointment };
    const salon = window.localStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
    this.getAppointments();
    this.getEmployees();
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
      if (!this.showStaffOnHeader) {
        this.employeeSelected =
          this.employees.length > 0 ? this.employees[0] : null;
      }
      this.fillColumnsBooked();
    },
    employeeChange(value) {
      this.employeeSelected = this.employees.find(s => s.id === Number(value));
      if (!this.employeeSelected) {
        this.showStaffOnHeader = true;
      }
      this.fillColumnsBooked();
    },
    fillColumnsBooked() {
      let allAppointments = this.appointments.slice(0);
      const { employeeSelected, showStaffOnHeader } = this;
      const columnsBooked = {};
      const bookingInfo = {};
      if (employeeSelected) {
        allAppointments = this.appointments
          .filter(book => book.employee.id === employeeSelected.id);
      }
      allAppointments.forEach((book) => {
        const start = moment.unix(book.start_at);
        const end = moment.unix(book.start_at).add(book.duration, 's');
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
        const start = moment.unix(book.start_at);
        const end = moment.unix(book.start_at).add(book.duration, 's');
        return `${start.format('H:mm')} - ${end.format('H:mm')}`;
      }
      if (order === 1) {
        return book.client.name;
      }
      if (order === 2) {
        return book.service.name;
      }
      return null;
    },
    getAppointments() {
      this.$emit('set-loading-overlay', true);
      api.get(`/salons/${this.salon.id}/appointments`)
        .then((response) => {
          this.appointments = response.data || [];
          this.fillColumnsBooked();
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível carregar seus agendamentos. Faça seu login novamente!',
            type: 'is-danger',
          });
        });
    },
    getEmployees() {
      this.$emit('set-loading-overlay', true);
      api.get(`/salons/${this.salon.id}/employees`)
        .then((response) => {
          this.employees = response.data || [];
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar os profissionais para este salão!',
            type: 'is-danger',
          });
        });
    },
    openModalNewAppointment() {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.saveNewAppointment,
        },
      ];
      this.appointment = { ...this.defaultAppointment };
      const data = {
        appointment: this.appointment,
        employees: this.employees,
        start: this.start,
        end: this.end,
      };
      this.$emit('open-modal', 'Novo Agendamento', Form, data, buttons);
    },
    saveNewAppointment() {
      this.$emit('set-loading-overlay', true);
      const startAt =
        moment.unix(this.appointment.start_at);
      api.post(
        `/salons/${this.salon.id}/appointments`,
        { ...this.appointment, start_at: startAt },
      ).then((response) => {
        const newAppointment = response.data;
        this.appointments.push(newAppointment);
        this.$emit('set-loading-overlay', false);
        this.$emit('close-modal');
      }).catch((error) => {
        this.$emit('set-loading-overlay', false);
        let errors = {};
        if (error.response) {
          errors = error.response.data || {};
        } else {
          errors.message = error.message;
        }
        this.errors = errors;
        this.$emit('set-form-errors', this.errors);
      });
    },
  },
};

</script>

<style lang="scss">
.agenda {

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
