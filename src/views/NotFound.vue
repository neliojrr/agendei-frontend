<template>
  <div>
    <Nav />
    <div class="thanks section">
      <h1 class="title is-spaced">Ops! Você parece estar perdido</h1>
      <h2 class="subtitle">
        Não encontramos a página que você está procurando <br />Que tal voltar a
        nossa página inicial e tentar novamente!?
        <a name="home" href="https://agendei.io/">Clique aqui</a> para voltar.
      </h2>
      <div class="columns">
        <div class="column">
          <img alt="not-found" title="Nao encontrado" src="../assets/images/lost.svg">
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
