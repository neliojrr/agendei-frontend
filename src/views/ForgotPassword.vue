<template>
  <div>
    <Nav />
    <div class="login container">
      <div class="columns">
        <div class="column">
          <img v-if="showSuccessMessage" src="../assets/images/reset_password_sent.svg">
          <img v-else src="../assets/images/forgot.svg">
        </div>
        <div class="column">
          <h1 class="title">{{ $t('title') }}</h1>
          <h2 class="subtitle">{{ $t('subtitle') }}</h2>
          <div
            v-if="showSuccessMessage"
            class="notification is-success"
          >
            <span>
              Enviamos um email com instruções de como redefinir sua senha.<br />
              Por favor, verifique sua caixa de entrada.
            </span>
          </div>
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
            @submit.prevent="forgotPasswordEmail"
          >
            <div class="field">
              <label class="label">Email</label>
              <div
                class="control"
                :class="{ 'has-icons-right': showSuccessMessage }"
              >
                <input
                  class="input"
                  :class="{ 'is-danger': !!errors.email }"
                  type="email"
                  :placeholder="$t('email-placeholder')"
                  name="email"
                  v-model="email"
                  autofocus
                />
                <span v-if="showSuccessMessage" class="icon is-small is-right">
                  <font-awesome-icon icon="check" />
                </span>
              </div>
              <p v-if="errors.email" class="help is-danger">
                {{ errors.email }}
              </p>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" :class="{ 'is-loading': isLoading }">
                  {{ $t('send') }}
                </button>
              </div>
              <div class="control">
                <a href="/login" class="button is-text">
                  {{ $t('login') }}
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
import { api } from '@/utils/api-connect';
import validate from '@/mixins/validate';

export default {
  data() {
    return {
      locale: 'pt-br',
      email: '',
      errors: {},
      isLoading: false,
      showSuccessMessage: false,
    };
  },
  components: {
    Nav,
  },
  mixins: [validate],
  methods: {
    forgotPasswordEmail() {
      if (this.validateFields()) {
        this.isLoading = true;
        const {
          email,
        } = this;
        api.post('/auth/password', {
          email,
          redirect_url: '/reset-password',
        })
          .then(() => {
            this.isLoading = false;
            this.showSuccessMessage = true;
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
                message: responseErrors ? responseErrors.toString() : 'Erro desconhecido',
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
      } = this;
      const errors = {};
      let isValid = true;
      if (!this.validateEmail(email)) {
        errors.email = 'Ops! Por favor, digite um email válido';
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
    "title": "Enter your email below",
    "subtitle": "Fill in your email and password to proceed",
    "email-placeholder": "you@example.com",
    "send": "Send",
    "login": "Back to login"
  },
  "pt-br": {
    "title": "Digite seu email de cadastro",
    "subtitle": "Esqueceu sua senha? Enviaremos um email com intruções para redefiní-la",
    "email-placeholder": "seuemail@exemplo.com",
    "send": "Enviar",
    "login": "Voltar para Login"
  }
}
</i18n>
