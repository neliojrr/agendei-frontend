<template>
  <section>
    <Menu />
    <NavApp :title="pageTitle" />
    <section class="my-salon-plan app-content">
      <section class="section">
        <form @submit="submitPlan">
          <div class="columns is-mobile is-vcentered">
            <div class="column is-narrow">
              <b-field label="Plano atual">
                <b-select placeholder="Meu plano atual" value="1">
                  <option value="1">Solo mensal</option>
                  <option value="2">Solo anual</option>
                </b-select>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Valor">
                <p><strong>R$32 / mês</strong></p>
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-full">
              <b-field label="Método de pagamento">
                <b-select placeholder="Selecione um método" value="1">
                  <option value="1">Cartão de crédito</option>
                  <option value="2">Boleto</option>
                </b-select>
              </b-field>
            </div>
          </div>
          <hr />
          <div class="columns">
            <div class="column is-6">
              <b-field label="Nome (como escrito no cartão)">
                <b-input :model="cardName" placeholder="" />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column is-6">
              <b-field label="Número do cartão">
                <b-input
                  :model="cardNumber"
                  placeholder="Digite o número do cartão sem espaços"
                />
              </b-field>
            </div>
          </div>
          <div class="columns is-multiline is-mobile">
            <div class="column is-3-desktop">
              <b-field label="Validade">
                <b-input :model="cardExpirationDate" placeholder="MM/YY" />
              </b-field>
            </div>
            <div class="column is-3-desktop">
              <b-field label="Código de Segurança">
                <b-input :model="cardCVV" type="password" />
              </b-field>
            </div>
          </div>
          <hr />
          <div class="columns">
            <div class="column">
              <input type="submit" value="Salvar" class="button is-primary" />
              <button class="button is-text">Cancelar</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import { api } from '@/utils/api-connect';
import Menu from '../components/Menu.vue';
import NavApp from '../components/NavApp.vue';

export default {
  components: {
    Menu,
    NavApp
  },
  props: {
    pageTitle: {
      type: String,
      default: 'Meu Plano'
    }
  },
  data() {
    return {
      cardName: 'Nelio Carneiro',
      cardNumber: '4111111111111111',
      cardExpirationDate: '09/22',
      cardCVV: '123',
      errors: {}
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      salon: state => state.salon
    })
  },
  methods: {
    submitPlan(e) {
      e.preventDefault();
      this.$emit('set-loading-overlay', true);
      const card = {};
      card.card_holder_name = this.cardName;
      card.card_expiration_date = this.cardExpirationDate;
      card.card_number = this.cardNumber;
      card.card_cvv = this.cardCVV;

      // pega os erros de validação nos campos do form e a bandeira do cartão
      const cardValidations = pagarme.validate({ card });

      // Então você pode verificar se algum campo não é válido
      if (!cardValidations.card.card_holder_name) {
        this.errors.cardNumber = 'Campo inválido';
        return;
      }
      if (!cardValidations.card.card_number) {
        this.errors.cardNumber = 'Campo inválido';
        return;
      }
      if (!cardValidations.card.card_cvv) {
        this.errors.cardCVV = 'Campo inválido';
        return;
      }
      if (!cardValidations.card.card_expiration_date) {
        this.errors.cardExpirationDate = 'Campo inválido';
        return;
      }

      // Mas caso esteja tudo certo, você pode seguir o fluxo
      pagarme.client
        .connect({ encryption_key: 'ek_test_NFVuxVpnP47ES2fPIJOlfV777yFwYm' })
        .then(client => client.security.encrypt(card))
        .then(cardHash => {
          api
            .post(`/salons/${this.salon.id}/subscribe`, {
              email: this.user.email,
              card_hash: cardHash,
              plan: 1
            })
            .then(response => {
              this.$emit('set-loading-overlay', false);
            });
        });
    }
  }
};
</script>

<style lang="scss">
.my-salon-plan {
  text-align: left;
}
</style>
