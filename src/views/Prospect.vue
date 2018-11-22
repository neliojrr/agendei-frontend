<template>
  <div>
    <Nav />
    <div class="prospect container">
      <div class="columns">
        <div class="column">
          <img alt="Informacoes do Usuario" src="../assets/images/wall_post.svg">
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
                  placeholder="Lucia Maria"
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
            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" :class="{ 'is-loading': isLoading }">
                  {{ $t('sign-up') }}
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
import api from '@/utils/api-connect';
import validate from '@/mixins/validate';

export default {
  data() {
    return {
      locale: 'pt-br',
      name: '',
      salonName: '',
      email: '',
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
      this.$ga.event('Contact', 'Form send', 'Registration');
      if (this.validateFields()) {
        this.isLoading = true;
        const {
          name,
          email,
          salonName,
        } = this;
        api.post('/prospect', {
          name,
          email,
          salon_name: salonName,
        })
          .then((response) => {
            this.isLoading = false;
            if (response.status > 200 && response.status < 300) {
              this.$router.push('/obrigado');
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
.prospect {
  padding-top: 5em;

  @media screen and (max-width: 768px) {
    padding-top: 1.5em;
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
        max-height: 280px;

        @media screen and (max-width: 768px) {
          max-height: 75px;
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
    "title": "Conte-nos sobre você",
    "subtitle": "Preencha os dados abaixo",
    "name": "Nome",
    "company-name": "Nome do estabelecimento",
    "email-placeholder": "seuemail@exemplo.com",
    "password": "Senha",
    "password-confirmation": "Confirme sua senha",
    "password-placeholder": "digite sua senha novamente",
    "sign-up": "Enviar",
    "has-account": "Já é cadastrado?"
  }
}
</i18n>
