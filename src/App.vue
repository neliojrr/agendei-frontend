<template>
  <div id="app">
    <section>
      <b-loading
        :is-full-page="true"
        :active.sync="isLoading"
      ></b-loading>
      <Modal
        :content="modalContent"
        :title="modalTitle"
        :show="showModal"
        :buttons="buttons"
        :data="formData"
        :errors="errors"
        @close="closeModal"
      />
      <router-view
        @open-modal="openModal"
        @close-modal="closeModal"
        @set-form-errors="setFormErrors"
        @set-loading-overlay="setLoadingOverlay"
      />
    </section>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import moment from 'moment';

moment.updateLocale('en', {
  weekdays: [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado',
  ],
  weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  months: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
    'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ],
  monthsShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov',
    'Dez',
  ],
});

export default {
  data() {
    return {
      showModal: false,
      modalContent: null,
      modalTitle: '',
      buttons: [],
      formData: this.data,
      errors: {},
      isLoading: false,
    };
  },
  props: ['data'],
  components: {
    Modal,
  },
  methods: {
    openModal(title, content, data, buttons) {
      this.showModal = true;
      this.modalContent = content;
      this.modalTitle = title;
      this.formData = data;
      this.buttons = buttons;
      this.errors = {};
    },
    closeModal() {
      this.showModal = false;
      this.modalContent = null;
      this.modalTitle = '';
      this.buttons = [];
      this.formData = {};
      this.errors = {};
    },
    setFormErrors(errors) {
      this.errors = errors;
    },
    setLoadingOverlay(isLoading) {
      this.isLoading = isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "assets/sass/variables";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.app-content {
  min-height: 85vh;
  @media screen and (min-width: 1024px) {
    margin-left: $side-menu-size;
  }
}
</style>
