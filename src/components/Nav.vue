<template>
  <nav
    class="navbar is-fixed-top"
    :class="{ 'navbar-transparent': transparent > -1 && transparent < 10 }"
  >
    <div class="container">
      <div class="navbar-brand">
        <a name="Agendei" class="navbar-item" href="https://agendei.io">
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
          <a
            name="blog"
            href="https://agendei.io/blog"
            class="navbar-item is-flex"
          >
            <span>{{ $t('blog') }}</span>
          </a>
          <a
            name="preços"
            href="https://agendei.io/precos"
            class="navbar-item is-flex"
          >
            <span>{{ $t('pricing') }}</span>
          </a>
          <a
            name="login"
            href="https://agendei.io/login"
            class="navbar-item is-flex"
          >
            <span>{{ $t('login') }}</span>
          </a>
          <a
            name="cadastrar"
            href="https://agendei.io/cadastrar"
            class="navbar-item is-flex"
          >
            <span>{{ $t('sign-up') }}</span>
          </a>
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
      isOpen: false
    };
  },
  props: {
    transparent: {
      type: Number,
      default: 20
    }
  },
  methods: {
    toggleBurgerMenu() {
      this.isOpen = !this.isOpen;
    }
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  }
};
</script>

<style lang="scss">
@import '../assets/sass/variables';

.navbar {
  background-color: $primary;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.07), 0 1px 5px 0 rgba(0, 0, 0, 0.11),
    0 3px 1px -2px rgba(0, 0, 0, 0.1);

  .navbar-brand {
    .navbar-burger {
      color: #ffffff;
    }

    .logo {
      color: #ffffff;
      font-size: 20px;
      font-weight: bold;
    }
  }
}

.navbar-transparent {
  background-color: transparent !important;
  box-shadow: none;
}

.navbar-end {
  a.navbar-item {
    text-decoration: none;
    width: 25%;
    cursor: pointer;

    span {
      opacity: 0.8;
      font-size: 16px;
      color: #ffffff;

      @media screen and (max-width: 1023px) {
        color: #000000;
      }

      &:after {
        display: block;
        width: 100%;
        content: '';
        border-bottom: 1px solid #fff;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: -webkit-transform 0.25s ease-in-out;
        transition: -webkit-transform 0.25s ease-in-out;
        transition: transform 0.25s ease-in-out;
        transition: transform 0.25s ease-in-out,
          -webkit-transform 0.25s ease-in-out;
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
    "login": "Login",
    "pricing": "Pricing",
    "blog": "Blog"
  },
  "pt-br": {
    "sign-up": "Cadastrar",
    "login": "Entrar",
    "pricing": "Preços",
    "blog": "Blog"
  }
}
</i18n>
