<template>
  <div id="app">
    <section>
      <Modal
        :content="modalContent"
        :title="modalTitle"
        :show="showModal"
        :buttons="buttons"
        @close="closeModal"
      />
      <router-view @open-modal="openModal" />
    </section>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {
  data() {
    return {
      showModal: false,
      modalContent: null,
      modalTitle: '',
      buttons: [],
    };
  },
  components: {
    Modal,
  },
  methods: {
    openModal(title, content, buttons) {
      this.showModal = true;
      this.modalContent = content;
      this.modalTitle = title;
      this.buttons = buttons;
    },
    closeModal() {
      this.showModal = false;
      this.modalContent = null;
      this.modalTitle = '';
      this.buttons = [];
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
  @media screen and (min-width: 1024px) {
    margin-left: $side-menu-size;
  }
}
</style>
