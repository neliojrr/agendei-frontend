<template>
  <div class="pricing">
    <Nav :transparent="transparent" />
    <section class="app-pricing section">
      <h1 class="title is-1 is-spaced">
        Gerencie seu salão por um preço que cabe no seu bolso
      </h1>
      <h2 class="subtitle is-4 has-text-grey">
        Sua agenda 🗓, clientes 💇‍♀️, serviços 💅, relatórios 📊 e muitos mais em
        um único lugar
      </h2>
      <div class="payment-switch is-flex">
        <span class="monthly">Plano mensal</span>
        <b-switch v-model="annual">Plano anual</b-switch>
      </div>
      <div class="discount-message">economize até 20%</div>
      <div class="columns is-variable is-2">
        <div class="column" v-for="plan in plans" :key="plan.id">
          <Plan v-bind="plan" :annual="annual" />
        </div>
      </div>
    </section>
    <section class="app-features container section">
      <h2 class="subtitle is-2 is-size-3-touch">
        As funcionalidades que você precisa
      </h2>
      <div class="columns is-multiline">
        <div class="column is-half">
          <p>
            <img alt="Agendamento" src="../assets/images/schedule.svg" />
          </p>
          <h3 class="subtitle is-4">
            Agendamento
          </h3>
          <p>
            Agendamento descomplicado e rápido para que você possa ter mais
            tempo e focar no cliente
          </p>
        </div>
        <div class="column is-half">
          <p>
            <img alt="Clientes" src="../assets/images/clients.svg" />
          </p>
          <h3 class="subtitle is-4">
            Gerencie seus clientes
          </h3>
          <p>
            Melhore o relacionamento com seus clientes através de informações
            detalhadas sobre agendamentos, histórico e detalhes de contato
          </p>
        </div>
        <div class="column is-half">
          <p>
            <img
              alt="Relatorio de Vendas"
              src="../assets/images/sales_report.svg"
            />
          </p>
          <h3 class="subtitle is-4">
            Aumente suas vendas
          </h3>
          <p>
            Através dos relatórios gerados pelo agendei você vai poder tomar
            melhores decisões sobre o seu negócio e assim aumentar suas vendas
          </p>
        </div>
        <div class="column is-half">
          <p>
            <img alt="Mensagens" src="../assets/images/messages.svg" />
          </p>
          <h3 class="subtitle is-4">
            Reduza o não comparecimento
          </h3>
          <p>
            O agendei envia lembretes automaticamente para seus clientes
            reduzindo as chances de não comparecimento
          </p>
        </div>
      </div>
    </section>
    <section class="pricing-last-button">
      <button
        title="Experimente gratis"
        type="button"
        class="button is-primary is-large"
        @click="goToRegister"
      >
        Cadastre-se
      </button>
    </section>
    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import Plan from '@/components/pricing/Plan.vue';

export default {
  components: {
    Nav,
    Footer,
    Plan
  },
  props: {
    pageTitle: {
      type: String,
      required: false,
      default: 'Preços'
    }
  },
  data() {
    return {
      transparent: -1,
      annual: false,
      plans: [
        {
          id: 1,
          price: 39,
          priceAnnual: 31,
          image: 'pricing_woman.svg',
          title: 'Solo',
          subtitle: 'Ideal para quem trabalha sozinho',
          features: [
            '1 profissional',
            'Agenda',
            'Clientes ilimitados',
            'Relatórios'
          ]
        },
        {
          id: 2,
          price: 79,
          priceAnnual: 63,
          image: 'pricing_team.svg',
          title: 'Team',
          subtitle: 'Ideal para pequenos salões',
          features: [
            '5 profissionais',
            'Agenda',
            'Clientes ilimitados',
            'Relatórios de venda',
            'Relatórios de comissão'
          ]
        },
        {
          id: 3,
          price: 159,
          priceAnnual: 143,
          image: 'pricing_salon.svg',
          title: 'Big',
          subtitle: 'Ideal para grandes estabelecimentos',
          features: [
            'Profissionais ilimitados',
            'Agenda',
            'Clientes ilimitados',
            'Todos os Relatórios'
          ]
        }
      ]
    };
  },
  methods: {
    goToRegister() {
      this.$ga.event('Home', 'Button click', 'Go to register');
      this.$router.push('/cadastrar');
    }
  }
};
</script>

<style lang="scss">
.pricing {
  position: absolute;
  top: 0;
  width: 100%;
  overflow-y: hidden;

  .app-pricing {
    margin-top: 5em;
    margin-bottom: 5em;

    h1 {
      @media screen and (max-width: 768px) {
        font-size: 28px;
      }
    }

    h2 {
      @media screen and (max-width: 768px) {
        font-size: 20px;
      }
    }
  }

  .payment-switch {
    justify-content: flex-end;
    height: 1em;
    margin-top: 5em;
    padding: 1em 0.8em;
    align-items: center;
    font-weight: bold;

    @media screen and (max-width: 768px) {
      justify-content: center;
    }

    .monthly {
      margin-right: 10px;
    }
  }

  .discount-message {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2em;
    align-items: center;
    font-style: italic;
    font-size: 14px;

    @media screen and (max-width: 768px) {
      margin-right: 2em;
    }
  }

  .app-features {
    margin-top: 2em;

    .column {
      p {
        img {
          height: 150px;
        }
      }
    }
  }

  .pricing-last-button {
    margin-bottom: 20em;
    margin-top: 4em;

    @media screen and (max-width: 768px) {
      margin-bottom: 30em;
    }
  }
}
</style>
