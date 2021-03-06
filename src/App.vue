<template>
  <div id="app">
    <section>
      <b-loading :is-full-page="true" :active.sync="isLoading"></b-loading>
      <Modal
        v-if="currentModal && currentModal.id"
        v-bind:key="currentModal.id"
        v-bind:id="currentModal.id"
        v-bind="currentModal.props"
      />
      <router-view
        @set-form-errors="setFormErrors"
        @set-loading-overlay="setLoadingOverlay"
      />
    </section>
  </div>
</template>

<script>
import moment from 'moment';
import Modal from '@/components/Modal.vue';

moment.updateLocale('en', {
  weekdays: [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
  ],
  weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthsShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ]
});

export default {
  data() {
    return {
      modalProps: {},
      isLoading: false
    };
  },
  props: ['data'],
  components: {
    Modal
  },
  computed: {
    modals() {
      return this.$store.state.modal.items;
    },
    currentModal() {
      const modalsCount = this.$store.state.modal.items.length;
      if (modalsCount > 0) {
        return this.$store.state.modal.items[modalsCount - 1];
      }
      return null;
    }
  },
  methods: {
    setFormErrors(errors) {
      this.modalProps = {
        ...this.modalProps,
        errors
      };
    },
    setLoadingOverlay(isLoading) {
      this.isLoading = isLoading;
    }
  }
};
</script>

<style lang="scss">
@import 'assets/sass/variables';

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
  height: calc(100vh - 52px);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  @media screen and (min-width: 1024px) {
    margin-left: $side-menu-size;
  }
}

.tooltip {
  display: block !important;
  z-index: 10000;
  box-shadow: 0 2px 10px #999;

  .tooltip-inner {
    background: $background;
    color: $text-dark;
    border-radius: 2px;
    padding: 10px;
    min-height: 150px;
    width: 300px;

    .columns {
      .column {
        color: $text;

        span {
          font-size: 13px;
        }
      }

      .figure {
        height: 50px;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 100%;
        font-size: 18px !important;
      }

      .client-name {
        display: flex;
        align-items: center;
      }

      .appointment-time {
        padding-bottom: 0;
        font-size: 13px;
      }

      .appointment-service {
        font-size: 13px;
      }

      .appointment-price {
        padding-bottom: 0;
        font-size: 16px;
        text-align: center;
        color: $primary;
      }

      .appointment-status {
        padding-bottom: 0;
        font-size: 12px;
        text-align: center;
        color: $success;
      }

      .appointment-status-no-show {
        color: $error;
      }

      .appointment-notes {
        margin-top: 0;
        font-size: 14px;
      }
    }

    .columns + .columns {
      border-top: 1px solid #cccccc;
    }
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: $background;
    z-index: 1;
  }

  &[x-placement^='top'] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>
