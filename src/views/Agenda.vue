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
      <MobileBottomMenu :buttons="buttons" :isHiddenDesktop="false" />
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
        @open-modal-checkout="openModalCheckout"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapMutations, mapGetters } from 'vuex';
import { api } from '@/utils/api-connect';
import AppointmentStatus from '@/utils/AppointmentStatus';
import modalId from '@/utils/modalId';
import log from '../mixins/log';
import Menu from '../components/Menu.vue';
import NavApp from '../components/NavApp.vue';
import MobileBottomMenu from '../components/MobileBottomMenu.vue';
import CalendarHeader from '../components/agenda/CalendarHeader.vue';
import Calendar from '../components/agenda/Calendar.vue';
import Form from '../components/agenda/Form.vue';
import FormSelectItem from '../components/sales/Form.vue';
import AppointmentView from '../components/agenda/AppointmentView.vue';

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
      buttons: [],
    };
  },
  props: ['pageTitle'],
  components: {
    Menu,
    NavApp,
    MobileBottomMenu,
    CalendarHeader,
    Calendar,
    Form,
    AppointmentView,
  },
  mixins: [log],
  created() {
    this.buttons = [
      {
        id: 'newSale',
        title: 'Nova Venda',
        icon: 'file-invoice-dollar',
        action: this.openModalSelectItem,
        class: 'is-info',
      },
      {
        id: 'newAppointment',
        title: 'Novo Agendamento',
        icon: 'calendar-alt',
        action: this.openModalNewAppointment,
      },
    ];
    const startDate = moment().hour(0).minute(0).seconds(this.start * 3600);
    this.defaultAppointment.start_at = startDate.unix();
    this.appointment = { ...this.defaultAppointment };
    const salon = window.localStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
    this.getAppointments();
    this.getEmployees();
  },
  methods: {
    ...mapMutations('modal', ['addModal', 'removeModal', 'updateModalProps']),
    ...mapGetters('modal', ['isModalOpen']),

    moment(date) {
      return moment(date);
    },

    changeDate(date) {
      this.daySelected = moment(date);
      this.showStaffOnHeader = true;
      this.getAppointments(this.daySelected);
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
        return book.client ? book.client.name : '';
      }
      if (order === 2) {
        return book.service ? book.service.name : '';
      }
      return null;
    },

    modalButtons() {
      const canComplete = this.appointment.status === AppointmentStatus.NEW ||
        this.appointment.status === AppointmentStatus.STARTED;
      const canEdit = this.appointment.status === AppointmentStatus.NEW ||
        this.appointment.status === AppointmentStatus.STARTED;
      const canNoShow = this.appointment.status === AppointmentStatus.NEW;
      const canStart = this.appointment.status === AppointmentStatus.NEW;

      const buttons = [];
      if (canComplete) {
        buttons.push({
          title: 'Finalizar',
          class: 'is-primary',
          action: this.checkout,
        });
      }

      const dropdown = [];
      if (canEdit) {
        dropdown.push({
          title: 'Editar',
          action: () => this.openModalEdit(this.appointment),
        });
      }
      if (canStart) {
        dropdown.push({
          title: 'Iniciar',
          class: 'has-text-info',
          action: () => {
            this.appointment.status = AppointmentStatus.STARTED;
            this.updateAppointment({ appointment: this.appointment });
          },
        });
      }
      if (canNoShow) {
        dropdown.push({
          title: 'Não compareceu',
          class: `has-text-danger ${this.appointment.status}`,
          action: () => {
            this.appointment.status = AppointmentStatus.NO_SHOW;
            this.updateAppointment({ appointment: this.appointment });
          },
        });
      }
      dropdown.push({
        title: 'Deletar',
        class: 'has-text-danger',
        action: this.deleteAppointment,
      });
      return { buttons, dropdown };
    },

    getAppointments(day = moment()) {
      this.$emit('set-loading-overlay', true);
      api.get(`/salons/${this.salon.id}/appointments`, {
        params: {
          day: day.format('YYYY-MM-DD'),
        },
      })
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

    openModalSelectItem() {
      const id = modalId.SELECT_ITEM_SALE;
      const props = { title: 'Selecione um item', content: FormSelectItem };
      this.addModal({ id, props });
    },

    openModalNewSale() {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.saveNewAppointment,
        },
      ];
      this.sale = { ...this.defaultSale };
      const data = {
        sale: this.appointment,
        employees: this.employees,
      };
      const id = modalId.NEW_SALE;
      const props = {
        title: 'Novo Agendamento', content: Form, data, buttons,
      };
      this.addModal({ id, props });
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
      const id = modalId.NEW_APPOINTMENT;
      const props = {
        title: 'Novo Agendamento', content: Form, data, buttons,
      };
      this.addModal({ id, props });
    },

    openModalEdit(appointment) {
      const buttons = [
        {
          title: 'Salvar',
          class: 'is-success',
          action: this.updateAppointment,
        },
      ];
      const data = {
        appointment: { ...appointment },
        employees: this.employees,
        start: this.start,
        end: this.end,
      };
      const id = modalId.EDIT_APPOINTMENT;
      const props =
        {
          title: 'Editar Agendamento', content: Form, data, buttons,
        };
      this.addModal({ id, props });
    },

    openModalCheckout(appointmentToCheckout) {
      this.appointment = appointmentToCheckout;
      const { buttons, dropdown } = this.modalButtons();
      const data = this.appointment;
      const id = modalId.CHECKOUT_APPOINTMENT;
      const props = {
        title: 'Agendamento',
        content: AppointmentView,
        data,
        buttons,
        dropdown,
      };
      this.addModal({ id, props });
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
        this.fillColumnsBooked();
        this.$emit('set-loading-overlay', false);
        this.removeModal({ id: modalId.NEW_APPOINTMENT });
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

    updateAppointment(data) {
      this.$emit('set-loading-overlay', true);
      const { appointment } = data;
      const startAt =
        moment.unix(appointment.start_at);
      api.put(
        `/appointments/${appointment.id}`,
        { ...appointment, start_at: startAt },
      ).then((response) => {
        const updatedAppointment = response.data || {};
        this.appointments = this.appointments.map((apt) => {
          if (apt.id === updatedAppointment.id) {
            return updatedAppointment;
          }
          return apt;
        });
        this.fillColumnsBooked();
        this.$emit('set-loading-overlay', false);
        this.removeModal({ id: modalId.EDIT_APPOINTMENT });
        const { buttons, dropdown } = this.modalButtons();
        this.updateModalProps({
          buttons,
          dropdown,
          id: modalId.CHECKOUT_APPOINTMENT,
          data: updatedAppointment,
        });
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

    deleteAppointment(appointment) {
      if (window.confirm('Você tem certeza?')) {
        this.$emit('set-loading-overlay', true);
        api.delete(`/appointments/${appointment.id}`)
          .then(() => {
            this.appointments = this.appointments.filter(app => app.id !== appointment.id);
            this.fillColumnsBooked();
            this.$toast.open({
              message: 'O agendamento foi excluído!',
              type: 'is-success',
            });
            this.$emit('set-loading-overlay', false);
            this.removeModal({ id: modalId.CHECKOUT_APPOINTMENT });
          })
          .catch((error) => {
            const message = error && error.response && error.response.data ?
              error.response.data.message :
              null;
            this.$toast.open({
              message: `Impossível deletar este agendamento! ${message}`,
              type: 'is-danger',
            });
            this.$emit('set-loading-overlay', false);
          });
      }
    },

    checkout(appointment) {
      this.$emit('set-loading-overlay', true);
      api.post(`/appointments/${appointment.id}/checkout`)
        .then((response) => {
          const updatedAppointment = response.data || {};
          this.appointments = this.appointments.map((apt) => {
            if (apt.id === updatedAppointment.id) {
              return updatedAppointment;
            }
            return apt;
          });
          this.fillColumnsBooked();
          this.$emit('set-loading-overlay', false);
          this.removeModal({ id: modalId.CHECKOUT_APPOINTMENT });
        })
        .catch((error) => {
          const message = error && error.response && error.response.data ?
            error.response.data.message :
            null;
          this.$toast.open({
            message: `Impossível realizer o checkout para esse agendamento! ${message}`,
            type: 'is-danger',
          });
          this.$emit('set-loading-overlay', false);
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
