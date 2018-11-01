<template>
  <div id="app">
    <section>
      <Notification
        :message="notificationMessage"
        :type="notificationType"
        :open="isOpen"
        @close-notification="closeNotification"
      />
      <router-view @open-notification="openNotification" />
    </section>
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue';

export default {
  data() {
    return {
      isOpen: false,
      notificationMessage: '',
      notificationType: 'is-success',
    };
  },
  components: {
    Notification,
  },
  methods: {
    openNotification(message, type) {
      this.isOpen = true;
      this.notificationMessage = message;
      this.notificationType = type;
    },
    closeNotification() {
      this.isOpen = false;
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
