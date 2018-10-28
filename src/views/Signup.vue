<template>
  <div>
    <Nav />
    <div class="signup container">
      <div class="columns">
        <div class="column">
          <img src="../assets/images/setup.svg">
        </div>
        <div class="column">
          <h1 class="title">{{ $t('title') }}</h1>
          <h2 class="subtitle">{{ $t('subtitle') }}</h2>
          <form
            autocompelete="new-password"
            role="presentation"
            class="form"
            @submit.prevent="register"
          >
            <div class="field">
              <label class="label">{{ $t('name') }}</label>
              <div class="control">
                <input
                  class="input"
                  :class="{ 'is-danger': !!errors[name] }"
                  type="text"
                  placeholder="Joao da Silva"
                  name="name"
                  v-model="name"
                />
              </div>
              <p v-if="errors[name]" class="help is-danger">
                {{ errors[name] }}
              </p>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  :placeholder="$t('email-placeholder')"
                  name="email"
                  v-model="email"
                />
              </div>
              <p v-if="errors[email]" class="help is-danger">
                {{ errors[email] }}
              </p>
            </div>
            <div class="field">
              <label class="label">{{ $t('password') }}</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  name="password"
                  v-model="password"
                />
              </div>
              <p v-if="errors[password]" class="help is-danger">
                {{ errors[password] }}
              </p>
            </div>
            <div class="field">
              <label class="label">{{ $t('password-confirmation') }}</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  name="password-confirmation"
                  v-model="passwordConfirmation"
                />
              </div>
              <p v-if="errors[passwordConfirmation]" class="help is-danger">
                {{ errors[passwordConfirmation] }}
              </p>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link">
                  {{ $t('sign-up') }}
                </button>
              </div>
              <div class="control">
                <a href="/login" class="button is-text">
                  {{ $t('has-account') }}
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import api from '@/utils/api-connect';

export default {
  name: 'signup',
  data() {
    return {
      locale: 'pt-br',
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
    };
  },
  components: {
    Nav,
  },
  methods: {
    register() {
      if (this.validateFields()) {
        const {
          name,
          email,
          password,
          passwordConfirmation,
        } = this;
        api.post('/auth', {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          manager: true,
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    validateFields() {
      const {
        name,
        email,
        password,
        passwordConfirmation,
      } = this;
      if (name === '') {
        this.errors.name = 'Ei, você esqueceu seu de colocar seu nome';
        return false;
      }
      if (!this.validateEmail(email)) {
        this.errors.email = 'Ops! Por favor, digite um email válido';
        return false;
      }
      if (password === '') {
        this.errors.password = 'Sua senha deve conter pelo menos 6 caracteres';
        return false;
      }
      if (password !== passwordConfirmation) {
        this.errors.passwordConfirmation = 'As senhas digitas devems ser iguais';
        return false;
      }
      return true;
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>

<style lang="scss">
.signup {
  height: calc(100vh - 55px);

  @media screen and (max-width: 768px) {
  height: calc(100vh - 75px);
    margin-top: 20px;
  }

  .columns {
    height: 100%;
    align-items: center;

    .column {

      img {
        max-height: 400px;

        @media screen and (max-width: 768px) {
          max-height: 150px;
        }
      }
    }
  }

  form {
    text-align: left;

    @media screen and (max-width: 768px) {
      padding: 0 32px;
    }
  }
}
</style>

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
