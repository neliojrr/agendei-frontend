<template>
  <div>
    <Nav />
    <div class="thanks section">
      <h1 class="title is-spaced">Muito obrigado!</h1>
      <h2 class="subtitle">
        Ficamos muito feliz com o seu cadastro. <br />Estamos acertando alguns detalhes
        e em breve entraremos em contato com você!
      </h2>
      <div class="columns">
        <div class="column">
          <img alt="Obrigado" title="Obrigado" src="../assets/images/thank_you.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
.thanks {
  img {
    height: 300px;

    @media screen and (max-width: 768px) {
      height: 200px;
    }
  }
}
</style>
