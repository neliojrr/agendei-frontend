<template>
  <div id="app">
    <NavApp />
    <Menu />
    <section class="app-content">
      <router-view />
    </section>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
import NavApp from './components/NavApp.vue';

export default {
  data() {
    return {};
  },
  components: {
    Menu,
    NavApp,
  },
};
</script>

<style lang="scss">
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
  margin-top: 50px;
}

select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: '';
}

select::-ms-expand {
  display: none;
}
</style>
