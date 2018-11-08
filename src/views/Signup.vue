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
          <div
            v-if="errors.messages"
            class="notification is-danger"
          >
            <button @click="deleteMessage" class="delete"></button>
            <span v-for="message in errors.messages" :key="message">
              {{ message }}
            </span>
          </div>
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
                  :class="{ 'is-danger': !!errors.name }"
                  type="text"
                  placeholder="Joao da Silva"
                  name="name"
                  v-model="name"
                />
              </div>
              <p v-for="message in errors.name" :key="message" class="help is-danger">
                {{ message }}
              </p>
            </div>
            <div class="field">
              <label class="label">{{ $t('company-name') }}</label>
              <div class="control">
                <input
                  class="input"
                  :class="{ 'is-danger': !!errors.salonName }"
                  type="text"
                  placeholder="Estúdio da Estética"
                  name="company-name"
                  v-model="salonName"
                />
              </div>
              <p v-for="message in errors.salonName" :key="message" class="help is-danger">
                {{ message }}
              </p>
            </div>
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
                />
              </div>
              <p v-for="message in errors.email" :key="message" class="help is-danger">
                {{ message }}
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
              <p v-for="message in errors.password" :key="message" class="help is-danger">
                {{ message }}
              </p>
            </div>
            <div class="field">
              <label class="label">{{ $t('password-confirmation') }}</label>
              <div class="control">
                <input
                  class="input"
                  :class="{ 'is-danger': !!errors.passwordConfirmation }"
                  type="password"
                  name="password-confirmation"
                  v-model="passwordConfirmation"
                />
              </div>
              <p
                v-for="message in errors.passwordConfirmation"
                :key="message"
                class="help is-danger"
              >
                {{ message }}
              </p>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" :class="{ 'is-loading': isLoading }">
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
import validate from '@/mixins/validate';

export default {
  data() {
    return {
      locale: 'pt-br',
      name: '',
      salonName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
    };
  },
  components: {
    Nav,
  },
  mixins: [validate],
  methods: {
    register() {
      this.errors = {};
      if (this.validateFields()) {
        this.isLoading = true;
        const {
          name,
          email,
          salonName,
          password,
          passwordConfirmation,
        } = this;
        api.post('/auth', {
          name,
          email,
          password,
          salon_name: salonName,
          password_confirmation: passwordConfirmation,
          is_new_salon: true,
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
              this.$toast.open({
                message: 'Seja bem vindo!',
                type: 'is-success',
              });
              this.$router.push('/calendar');
            }
          })
          .catch((error) => {
            this.isLoading = false;
            const { errors: responseErrors } =
              error.response && error.response.data
                ? error.response.data
                : {};
            const errors = {
              ...responseErrors,
            };
            this.errors = errors;
          });
      }
    },
    validateFields() {
      const {
        name,
        salonName,
        email,
        password,
        passwordConfirmation,
      } = this;
      const errors = {};
      let isValid = true;
      if (name === '') {
        errors.name = ['Ei, você esqueceu seu de colocar seu nome'];
        isValid = false;
      }
      if (salonName === '') {
        errors.salonName = ['Você tem de digitar o nome do seu estabelecimento'];
        isValid = false;
      }
      if (!this.validateEmail(email)) {
        errors.email = ['Ops! Por favor, digite um email válido'];
        isValid = false;
      }
      if (password === '') {
        errors.password = ['Sua senha deve conter pelo menos 6 caracteres'];
        isValid = false;
      }
      if (password !== passwordConfirmation) {
        errors.passwordConfirmation = ['As senhas digitadas devems ser iguais'];
        isValid = false;
      }
      this.errors = errors;
      return isValid;
    },
    deleteMessage() {
      const errors = {
        ...this.errors,
        messages: null,
      };
      this.errors = errors;
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
    "title": "Register your account",
    "subtitle": "Fill in your data to proceed",
    "name": "Name",
    "company-name": "Company name",
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
    "company-name": "Nome do estabelecimento",
    "email-placeholder": "seuemail@exemplo.com",
    "password": "Senha",
    "password-confirmation": "Confirme sua senha",
    "password-placeholder": "digite sua senha novamente",
    "sign-up": "Cadastrar",
    "has-account": "Já é cadastrado?"
  }
}
</i18n>
