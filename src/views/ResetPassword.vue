<template>
  <div>
    <Nav />
    <div class="login container">
      <div class="columns">
        <div class="column">
          <img src="../assets/images/password_reset.svg">
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
            @submit.prevent="changePassword"
          >
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
            <div class="field">
              <label class="label">{{ $t('password-confirmation') }}</label>
              <div class="control">
                <input
                  class="input"
                  :class="{ 'is-danger': !!errors.password_confirmation }"
                  type="password"
                  name="passwordConfirmation"
                  v-model="passwordConfirmation"
                />
              </div>
              <p v-if="errors.password_confirmation" class="help is-danger">
                {{ errors.password_confirmation }}
              </p>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" :class="{ 'is-loading': isLoading }">
                  {{ $t('send') }}
                </button>
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
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
    };
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  components: {
    Nav,
  },
  mixins: [validate],
  methods: {
    changePassword() {
      if (this.validateFields()) {
        this.isLoading = true;
        const {
          passwordConfirmation,
          password,
          token,
        } = this;
        api.put('/auth/password', {
          password,
          password_confirmation: passwordConfirmation,
          reset_password_token: token,
        })
          .then(() => {
            this.isLoading = false;
            this.$toast.open({
              message: 'Sua senha foi alterada com sucesso! Faça seu login para continuar',
              type: 'is-success',
            });
            this.$router.push('/login');
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
        passwordConfirmation,
        password,
      } = this;
      const errors = {};
      let isValid = true;
      if (password === '') {
        errors.password = 'Sua senha deve conter pelo menos 6 caracteres';
        isValid = false;
      }
      if (passwordConfirmation !== password) {
        errors.password_confirmation = 'As senhas devem ser iguais';
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
    "title": "Enter your new password",
    "subtitle": "Fill in your email and password to proceed",
    "password": "Password",
    "password-confirmation": "Confirm your password",
    "send": "Send"
  },
  "pt-br": {
    "title": "Redefinir senha",
    "subtitle": "Digite sua nova senha",
    "password": "Senha",
    "password-confirmation": "Confirme sua senha",
    "send": "Enviar"
  }
}
</i18n>
