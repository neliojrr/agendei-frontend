<template>
  <div>
    <Nav />
    <div class="auth">
      <div class="container">
        <div class="auth__inner">
          <div class="auth__media">
            <img src="../assets/images/login.svg">
          </div>
          <div class="auth__auth">
            <h1 class="auth__title">{{ $t('title') }}</h1>
            <p>{{ $t('subtitle') }}</p>
            <form autocompelete="new-password" role="presentation" class="form">
              <label>Email</label>
              <input type="text" name="email" id='email' v-bind:placeholder="$t('email-placeholder')">
              <label>{{ $t('password') }}</label>
              <input type="password" name="password" id='password' autocomplete="off">
              <button type='submit' class="button button__accent">{{ $t('sign-in') }}</button>
              <a href=""><h6 class="left-align" >{{ $t('forgot') }}</h6></a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
  name: 'login',
  data() {
    return { locale: 'pt-br' };
  },
  components: {
    Nav,
  },
};
</script>

<i18n>
{
  "en": {
    "title": "Sign in to your account",
    "subtitle": "Fill in your email and password to proceed",
    "email-placeholder": "you@example.com",
    "password": "Password",
    "sign-ip": "Sign ip",
    "forgot": "Forgot your password?"
  },
  "pt-br": {
    "title": "Faça seu login no agendei",
    "subtitle": "Digite seu email e senha para entrar",
    "email-placeholder": "seuemail@exemplo.com",
    "password": "Senha",
    "sign-in": "Entrar",
    "forgot": "Esqueceu sua senha?"
  }
}
</i18n>
