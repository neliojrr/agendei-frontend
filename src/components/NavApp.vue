<template>
  <header class="navbar">
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
      <div class="navbar-title">
        <h2>{{ title[$route.name] }}</h2>
        <router-link to="/profile">
          <font-awesome-icon icon="user" />
        </router-link>
        <router-link to="/logout">
          <font-awesome-icon icon="sign-out-alt" />
        </router-link>
      </div>
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
  </header>
</template>

<script>
import menuItems from '../utils/menuItems';

export default {
  data() {
    return {
      items: menuItems,
      isOpen: false,
      title: {
        calendar: 'Calendário',
      }
    };
  },
  created() {
    console.log(this.$route.name);
  },
  methods: {
    toggleBurgerMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss">
.navbar {
  position: absolute;
  top: 0;
  left: 0;
}

.navbar-brand {

  .navbar-burger {
    color: white;
    margin-left: initial;
    z-index: 99;
  }

  .navbar-burger:hover {
    color: #FFFFFF;
  }

  .navbar-burger:active {
    color: #FFFFFF;
  }

  .navbar-title {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      color: #FFFFFF;
      margin: 0;
      font-size: 24px;
    }

    a {
      position: absolute;
      right: 0;
      margin-right: 65px;
      font-size: 20px;
      color: #FFFFFF;
    }

    a + a {
      margin-right: 25px;
    }
  }
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

