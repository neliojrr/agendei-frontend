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
          <div
            v-if="errors.message"
            class="notification is-danger"
          >
            <button @click="deleteMessage" class="delete"></button>
            <span>
              {{ errors.message }}
            </span>
          </div>
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
                  :class="{ 'is-danger': !!errors.email }"
                  type="email"
                  :placeholder="$t('email-placeholder')"
                  name="email"
                  v-model="email"
                  autofocus
                />
              </div>
              <p v-if="errors.email" class="help is-danger">
                {{ errors.email }}
              </p>
            </div>
            <div class="field">
              <label class="label">{{ $t('password') }}</label>
              <div class="control">
                <input
                  class="input"
                  :class="{ 'is-danger': !!errors.password }"
                  type="password"
                  name="password"
                  v-model="password"
                />
              </div>
              <p v-if="errors.password" class="help is-danger">
                {{ errors.password }}
              </p>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" :class="{ 'is-loading': isLoading }">
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
      isLoading: false,
    };
  },
  props: ['open-notification'],
  components: {
    Nav,
  },
  mixins: [validate],
  created() {
    const user = JSON.parse(window.sessionStorage.getItem('user')) || {};
    const salon = JSON.parse(window.sessionStorage.getItem('salon')) || {};
    if (user.id && salon.id) {
      this.$emit(
        'open-notification',
        'Bem vindo! Você foi logado com sucesso',
        'is-success',
      );
      this.$router.replace('/calendar');
    }
  },
  methods: {
    login() {
      if (this.validateFields()) {
        this.isLoading = true;
        const {
          email,
          password,
        } = this;
        api.post('/auth/sign_in', {
          email,
          password,
        })
          .then((response) => {
            this.isLoading = false;
            if (response.status === 200) {
              const { data, headers } = response;
              const user = {
                ...data.user,
                token: headers['access-token'],
                client: headers.client,
              };
              window.sessionStorage.setItem(
                'user',
                JSON.stringify(user),
              );
              window.sessionStorage.setItem(
                'salon',
                JSON.stringify(user.salon),
              );
              this.$emit(
                'open-notification',
                'Bem vindo!',
                'is-success',
              );
              this.$router.push('/calendar');
            }
          })
          .catch((error) => {
            this.isLoading = false;
            let errors = {};
            if (error.response) {
              const { errors: responseErrors } =
                error.response && error.response.data
                  ? error.response.data
                  : {};
              errors = {
                message: responseErrors.toString(),
              };
            } else {
              errors.message = error.message;
            }
            this.errors = errors;
          });
      }
    },
    validateFields() {
      const {
        email,
        password,
      } = this;
      const errors = {};
      let isValid = true;
      if (!this.validateEmail(email)) {
        errors.email = 'Ops! Por favor, digite um email válido';
        isValid = false;
      }
      if (password === '') {
        errors.password = 'Sua senha deve conter pelo menos 6 caracteres';
        isValid = false;
      }
      this.errors = errors;
      return isValid;
    },
    deleteMessage() {
      this.errors = [];
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
