<template>
  <div class="navbar-web">
    <nav class="nav__mobile"></nav>
    <div class="container">
      <div class="navbar__inner">
        <a href="#" class="navbar__logo">Agendei</a>
        <nav class="navbar__menu">
          <ul>
            <li><a href="/signup">{{ $t('sign-up') }}</a></li>
            <li><a href="/login">{{ $t('login') }}</a></li>
          </ul>
        </nav>
        <div class="navbar__menu-mob">
          <a href="" id='toggle'>
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" 
                class=""
                >
              </path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navSite',
  data() {
    return { locale: 'pt-br' };
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    },
  },
};
</script>

<style lang="scss">
</style>

<i18n>
{
  "en": {
    "sign-up": "Sign Up",
    "login": "Login"
  },
  "pt-br": {
    "sign-up": "Cadastre-se",
    "login": "Entrar"
  }
}
</i18n>
