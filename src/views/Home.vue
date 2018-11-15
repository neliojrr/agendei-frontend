<template>
  <div class="home">
    <Nav :transparent="transparent" />
    <section class="top">
      <div class="overlay">
      </div>
      <div class="mask">
      </div>
      <div class="content section">
        <h1 class="title is-1 is-size-3-touch has-text-white-ter">
          Gerencie seu salão no computador ou celular
        </h1>
        <h2 class="subtitle is-4 is-size-6-touch has-text-white-ter">
          Simples, fácil e intuitivo software para agendamentos e controle
          do seu estabelecimento.
        </h2>
        <button class="button is-primary is-large" @click="goToRegister">
          Experimente grátis
        </button>
      </div>
    </section>
    <section class="app-info container section">
      <h2 class="subtitle is-2 is-size-3-touch">
        Funcionalidades para facilitar o seu dia a dia
      </h2>
      <div class="columns is-multiline">
        <div class="column is-half">
          <p>
            <img src="../assets/images/schedule.svg">
          </p>
          <h3 class="subtitle is-4">
            Agendamento
          </h3>
          <p>
            Agendamento descomplicado e rápido para que você possa ter mais tempo
            e focar no cliente
          </p>
        </div>
        <div class="column is-half">
          <p>
            <img src="../assets/images/clients.svg">
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
            <img src="../assets/images/sales_report.svg">
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
            <img src="../assets/images/messages.svg">
          </p>
          <h3 class="subtitle is-4">
            Reduza o não comparecimento
          </h3>
          <p>
            O agendei envia lembretes automaticamente para seus clientes reduzindo
            as changes de não comparecimento
          </p>
        </div>
      </div>
    </section>
    <section class="app-screenshot section">
      <h3 class="subtitle is-2 is-size-3-touch">
        Tenha todas as informações na palma da sua mão
      </h3>
      <h4 class="subtitle is-5">
        Acesse o Agendei de qualquer dispositivo, seja ele um computador, tablet
        ou celular
      </h4>
      <div class="container mockups">
        <img src="../assets/images/mockup_final.png" />
      </div>
    </section>
    <section class="contact-form section">
      <div class="container">
        <h3 class="subtitle is-3 is-size-4-touch">
          Cadastre-se e entraremos em contato com você
        </h3>
        <h4 class="subtitle is-5 is-size-6-touch">
          Teste gratuitamente por 30 dias
        </h4>
        <p>
          <button class="button is-primary is-large" @click="goToRegister">
            Cadastre-se
          </button>
        </p>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';

export default {
  data() {
    return {
      transparent: 0,
    };
  },
  components: {
    Nav,
    Footer,
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.transparent = window.pageYOffset;
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    goToRegister() {
      this.$router.push('/contato');
    },
    handleScroll() {
      this.transparent = window.pageYOffset;
    },
  },
};
</script>

<style lang='scss'>
.home {
  position: absolute;
  top: 0;
  width: 100%;
  overflow-y: hidden;

  .top {
    position: relative;
    height: 80vh;
    width: 100%;
    box-shadow: 0 4px 11px rgba(124,146,169,.5);
    color: #FFFFFF;

    .overlay {
      background: linear-gradient(90deg,#6c63ff,#4641ff);
      position: absolute;
      height: 100%;
      width: 100%;
      opacity: 0.94;
      z-index: 2;
      top: 0;
    }

    .mask {
      position: absolute;
      height: 100%;
      width: 100%;
      background-image: url('../assets/images/salon_bg_small_2.jpg');
      background-size: cover;
      background-position: 50%;
      background-repeat: no-repeat;
      opacity: 0.56;
    }

    .content {
      position: relative;
      z-index: 10;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h1 {
        margin-bottom: 30px;
      }

      button {
        margin-top: 20px;
      }
    }
  }

  .app-info {
    margin-top: 2em;

    .column {

      p {

        img {
          height: 150px;
        }
      }
    }
  }

  .app-screenshot {
    width: 100%;
    background-color: #f8f8f8;
    margin-top: 30px;

    .mockups {
      max-width: 1444px;

      img {
        box-shadow: 4px 10px 20px rgba(124,146,169,.5);
        position: relative;
        z-index: 1;
        max-width: 100%;
        height: auto;
        width: auto\9; /* ie8 */
      }
    }
  }

  .contact-form {
    padding-top: 80px;
    padding-bottom: 180px;

    input {
      width: 50%;
    }
  }
}
</style>
