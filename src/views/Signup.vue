<template>
  <div>
    <Nav />
    <div class="auth">
      <div class="container">
        <div class="auth__inner">
          <div class="auth__media">
            <img src="../assets/images/setup.svg">
          </div>
          <div class="auth__auth">
            <h1 class="auth__title">{{ $t('title') }}</h1>
            <p>{{ $t('subtitle') }}</p>
            <form autocompelete="new-password" role="presentation" class="form">
              <label>{{ $t('name') }}</label>
              <input type="text" name="name" id='name' placeholder="Joao da Silva">
              <label>Email</label>
              <input type="text" name="email" id='email' v-bind:placeholder="$t('email-placeholder')">
              <label>{{ $t('password') }}</label>
              <input type="password" name="password" id='password' autocomplete="off">
              <label>{{ $t('password-confirmation') }}</label>
              <input type="password" name="password-confirmation" id='password-confirmation' v-bind:placeholder="$t('password-placeholder')" autocomplete="off">
              <button type='submit' class="button button__accent">{{ $t('sign-up') }}</button>
              <a href="/login"><h6 class="left-align" >{{ $t('has-account') }}</h6></a>
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
  name: 'signup',
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
    "title": "Register your account",
    "subtitle": "Fill in your data to proceed",
    "name": "Name",
    "email-placeholder": "you@example.com",
    "password": "Password",
    "password-confirmation": "Password Confirmation",
    "password-placeholder": "type your password again",
    "sign-up": "Sign up",
    "has-account": "Already has an account?"
  },
  "pt-br": {
    "title": "Faça seu cadastro",
    "subtitle": "Preencha os dados abaixo",
    "name": "Nome",
    "email-placeholder": "seuemail@exemplo.com",
    "password": "Senha",
    "password-confirmation": "Confirme sua senha",
    "password-placeholder": "digite sua senha novamente",
    "sign-up": "Cadastrar",
    "has-account": "Já é cadastrado?"
  }
}
</i18n>
