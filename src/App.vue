<template>
  <div id="app">
    <section>
      <router-view />
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {};
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
  margin-top: 50px;

  @media screen and (min-width: 1024px) {
    margin-left: $side-menu-size;
  }
}
</style>
