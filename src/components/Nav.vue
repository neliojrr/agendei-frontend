<template>
  <nav class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://agendei.io">
          <span class="logo">Agendei</span>
        </a>
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
        <div class="navbar-end">
          <router-link to="/signup" class="navbar-item is-flex">
            <span>{{ $t('sign-up') }}</span>
          </router-link>
          <router-link to="/login" class="navbar-item is-flex">
            <span>{{ $t('login') }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navSite',
  data() {
    return {
      locale: 'pt-br',
      isOpen: false,
    };
  },
  methods: {
    toggleBurgerMenu() {
      this.isOpen = !this.isOpen;
    },
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/sass/variables";

.navbar {
  background-color: $primary;

  .navbar-brand {

    .navbar-burger {
      color: #FFFFFF;
    }

    .logo {
      color: #FFFFFF;
      font-size: 20px;
      font-weight: bold;
    }
  }
}

.navbar-end {

  a.navbar-item {
    text-decoration: none;
    width: 60%;
    cursor: pointer;

    span {
      opacity: 0.8;
      font-size: 16px;
      color: #FFFFFF;

      @media screen and (max-width: 1023px) {
        color: #000000;
      }

      &:after {
        display: block;
        width: 100%;
        content: "";
        border-bottom: 1px solid #fff;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: -webkit-transform .25s ease-in-out;
        transition: -webkit-transform .25s ease-in-out;
        transition: transform .25s ease-in-out;
        transition: transform .25s ease-in-out,-webkit-transform .25s ease-in-out;
      }
    }
  }

  a.navbar-item:hover {
    background: none;

    span {
      opacity: 1;

      &:after {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "sign-up": "Sign Up",
    "login": "Login"
  },
  "pt-br": {
    "sign-up": "Cadastrar",
    "login": "Entrar"
  }
}
</i18n>
