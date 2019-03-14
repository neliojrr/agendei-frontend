<template>
  <header class="navbar-app navbar">
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
        <h2>{{ title }}</h2>
        <div class="right-icons">
          <router-link class="button is-text" title="Meu salão" to="/salon">
            <font-awesome-icon icon="store" />
          </router-link>
          <router-link class="button is-text" title="Meu perfil" to="/profile">
            <font-awesome-icon icon="user" />
          </router-link>
          <button class="button is-text" @click="logout" title="Sair">
            <font-awesome-icon icon="sign-out-alt" />
          </button>
        </div>
      </div>
    </div>
    <div class="navbar-menu is-hidden-desktop" v-bind:class="{ 'is-active': isOpen }">
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
import { api } from '@/utils/api-connect';
import menuItems from '../utils/menuItems';

export default {
  data() {
    return {
      items: menuItems,
      isOpen: false,
    };
  },
  props: ['title'],
  methods: {
    toggleBurgerMenu() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      api.delete('/auth/sign_out')
        .then(() => {
          this.$router.push('/login');
        })
        .catch(() => {
          window.localStorage.setItem('user', null);
          window.localStorage.setItem('salon', null);
          window.localStorage.setItem('agendeiAuth', null);
          this.$router.push('/login');
        });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/sass/variables";

.navbar-app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  @media screen and (min-width: 1024px) {
    margin-left: $side-menu-size;
    width: calc(100% - #{$side-menu-size}) !important;
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

      .right-icons {
        position: absolute;
        right: 0;

        a, button {
          font-size: 22px;
          color: #FFFFFF;
          @media screen and (max-width: 768px) {
            font-size: 18px;
            width: 38px;
          }
        }

        a:hover, button:hover {
          background-color: #FFFFFF;
          color: $primary;
        }

        a:last-child {
          margin-right: 0;
        }
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
}
</style>

