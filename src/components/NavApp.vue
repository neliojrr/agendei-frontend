<template>
  <div class="navbar">
    <div class="navbar-brand">
      <a
        class="navbar-burger"
        v-bind:class="{ 'is-active': isOpen }"
        v-on:click="toggleBurgerMenu"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" v-bind:class="{ 'is-active': isOpen }">
      <div class="navbar-start">
        <router-link
          v-bind:to="item.path"
          v-bind:key="item.id"
          v-for="item in items"
          class="navbar-item is-flex"
        >
          <font-awesome-icon v-bind:icon="item.icon" />
          <span class="menu-title">{{ item.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import menuItems from '../utils/menuItems';

export default {
  data() {
    return {
      items: menuItems,
      isOpen: false,
    };
  },
  created() {
    //console.log(this.items);
  },
  methods: {
    toggleBurgerMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss">
.navbar-burger {
  color: white;
  margin-left: initial;
}

.navbar-burger:hover {
  color: #FFFFFF;
}

.navbar-burger:active {
  color: #FFFFFF;
}

.navbar-menu {

  .navbar-item {
    width: 50%;
    margin: auto;
    align-items: center;
    font-size: 20px;

    svg {
      width: 30%;
    }
  }
}

</style>

