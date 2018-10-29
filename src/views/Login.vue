<template>
  <div>
    <Nav />
    <div class="login container">
      <div class="columns">
        <div class="column">
          <img src="../assets/images/login.svg">
        </div>
        <div class="column">
          <h1 class="title">{{ $t('title') }}</h1>
          <h2 class="subtitle">{{ $t('subtitle') }}</h2>
          <form
            role="presentation"
            class="form"
            @submit.prevent="login"
          >
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="email"
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
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link">
                  {{ $t('sign-in') }}
                </button>
              </div>
              <div class="control">
                <a href="/login" class="button is-text">
                  {{ $t('forgot') }}
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
import validate from '@/mixins/validate';

export default {
  data() {
    return {
      locale: 'pt-br',
      email: '',
      password: '',
      errors: {},
    };
  },
  components: {
    Nav,
  },
  mixins: [validate],
  methods: {
    login() {
      if (this.validateFields()) {
        const {
          email,
          password,
        } = this;
        api.post('/auth/sign_in', {
          email,
          password,
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
        email,
        password,
      } = this;
      if (!this.validateEmail(email)) {
        this.errors.email = 'Ops! Por favor, digite um email válido';
        return false;
      }
      if (password === '') {
        this.errors.password = 'Sua senha deve conter pelo menos 6 caracteres';
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
.login {
  height: calc(100vh - 55px);

  @media screen and (max-width: 768px) {
    height: calc(100vh - 75px);
    margin-top: 20px;
  }

  .columns {
    height: 100%;
    align-items: center;

    .column {

      .title {
        @media screen and (max-width: 768px) {
          font-size: 1.75rem;
        }
      }


      .subtitle {
        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }
      }

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
