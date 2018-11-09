<template>
  <div class="client-sales">
    <div class="card">
      <div class="card-content">
        <div class="columns is-mobile content top-columns">
          <div class="column">
            <p class="heading is-spaced">Vendas Totais</p>
            <p class="subtitle is-5">R$ 435,00</p>
          </div>
          <div class="column">
            <p class="heading is-spaced">Prospecção</p>
            <p class="subtitle is-5">R$ 135,00</p>
          </div>
        </div>
        <div class="columns is-mobile content bottom-columns">
          <div class="column">
            <p class="heading is-spaced">Agendamentos</p>
            <p class="subtitle is-5">8</p>
          </div>
          <div class="column">
            <p class="heading is-spaced">Finalizados</p>
            <p class="subtitle is-5">6</p>
          </div>
          <div class="column is-hidden-touch">
            <p class="heading is-spaced">Cancelados</p>
            <p class="subtitle is-5">0</p>
          </div>
          <div class="column is-hidden-touch">
            <p class="heading is-spaced">Não compareceu</p>
            <p class="subtitle is-5">0</p>
          </div>
        </div>
        <div class="columns is-mobile content bottom-columns is-hidden-desktop">
          <div class="column">
            <p class="heading is-spaced">Cancelados</p>
            <p class="subtitle is-5">0</p>
          </div>
          <div class="column">
            <p class="heading is-spaced">Não compareceu</p>
            <p class="subtitle is-5">0</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
.client-sales {

  .card {

    .card-content {

      div {
        margin-bottom: 15px;
      }

      .top-columns {
        border-bottom: 1px solid $grey-lighter;

        .column:first-child {
          border-right: 1px solid $grey-lighter;
        }
      }

      .bottom-columns {
        margin-top: 15px;
        margin-bottom: 0;

        .column {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>

