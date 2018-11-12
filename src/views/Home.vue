<template>
  <div class="home">
    <Nav :transparent="true" />
    <section class="top">
      <div class="overlay">
      </div>
      <div class="mask">
      </div>
      <div class="content section">
        <h1 class="title is-1 has-text-white-ter">
          Gerencie seu salão no computador ou celular
        </h1>
        <h2 class="subtitle is-4 has-text-white-ter">
          Simples, fácil e intuitivo software para agendamentos e controle
          do seu estabelecimento.
        </h2>
        <button class="button is-primary is-large" @click="goToRegister">
          Experimente grátis
        </button>
      </div>
    </section>
    <section class="app-info section">
      <h2 class="subtitle is-2">
        All features you've asked for
      </h2>
      <div class="columns is-mobile">
        <div class="column">
          <p>
            <img src="../assets/images/schedule.svg">
          </p>
          <p>
            some text that I still don't know but I'll put it here
          </p>
        </div>
        <div class="column">
          <p>
            <img src="../assets/images/sales_report.svg">
          </p>
          <p>
            some text that I still don't know but I'll put it here
          </p>
        </div>
        <div class="column">
          <p>
            <img src="../assets/images/clients.svg">
          </p>
          <p>
            some text that I still don't know but I'll put it here
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
  data() {
    return {};
  },
  components: {
    Nav,
  },
  methods: {
    goToRegister() {
      this.$router.push('/signup');
    },
  },
};
</script>

<style lang='scss' scope>
html {
  padding-top: 0 !important;
}

.home {
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
      background-image: url('../assets/images/salon_bg_small.jpg');
      background-size: cover;
      background-position: 50%;
      background-repeat: no-repeat;
      opacity: 0.66;
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

    h2 {
      margin-bottom: 2em;
    }

    .column {

      p {

        img {
          height: 200px;
        }
      }
    }
  }
}
</style>
