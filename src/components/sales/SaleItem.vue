<template>
  <div class="sale-item box">
    <header class="box-header columns is-multiline is-mobile">
      <div
        class="box-header-title column is-two-thirds-mobile is-three-quarters-desktop is-three-quarters-tablet"
      >
        <p class="title is-5">
          {{ item.name }}
        </p>
      </div>
      <div class="column item-price">
        <p class="is-size-6 has-text-dark has-text-weight-semibold">
          R${{ item.price }}
        </p>
    </div>
      <span class="delete-item column">
        <button type="button" class="delete"></button>
      </span>
      <p class="box-header-subtitle column is-11 subtitle is-6 has-text-grey">
        1h e meia com Nelio
      </p>
    </header>
    <div class="box-content columns is-mobile is-multiline">
      <div class="field column is-one-quarter-mobile">
        <label class="label has-text-weight-medium">Qtd</label>
        <div class="control">
          <input class="input" type="text" placeholder="1">
        </div>
      </div>
      <div class="field column is-half-desktop is-one-third-tablet is-three-quarters-mobile">
        <label class="label">Profissional</label>
        <div class="control">
          <input class="input" type="text" placeholder="Nelio">
        </div>
      </div>
      <div class="field column is-one-fifth-desktop is-one-fourth-tablet">
        <label class="label">Preço</label>
        <div class="control">
          <input class="input" type="text" placeholder="R$4,45">
        </div>
      </div>
      <div class="field column is-one-fifth-desktop is-one-fourth-tablet">
        <label class="label">Desconto</label>
        <div class="control">
          <input class="input" type="text" placeholder="R$5,00">
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
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.sale-item {

  .box-header {
    margin-bottom: 0;
  }

  .box-header-title {
    text-align: left;
    margin-bottom: 0;
    padding-bottom: 0.3em;
  }

  .box-header-subtitle {
    text-align: left;
    padding-top: 0;
  }

  .item-price {
    padding-bottom: 0.3em;
  }

  .delete-item {
    margin-left: auto;
    margin-right: 0;
    padding-bottom: 0.3em;
    text-align: right;
  }

  .box-content {
    margin-top: 0px;
  }
}
</style>
