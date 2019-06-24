<template>
  <div class="checkout-area box">
    <section class="columns is-multiline">
      <section class="column is-full client-section">
        <ClientSelect @setClient="$emit('set-client')" />
      </section>
      <section class="column is-full">
        <div class="field">
          <label class="label">Valor</label>
          <div class="control has-icons-left">
            <input class="input is-medium" type="text" :value="displayRawMoney(total)" />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="dollar-sign" />
            </span>
          </div>
        </div>
      </section>
      <section class="column is-full payment-type">
        <div class="payment-buttons">
          <button class="button is-primary is-medium">
            Dinheiro
          </button>
          <button class="button is-primary is-medium">
            Outro
          </button>
        </div>
        <div class="payment-buttons">
          <button class="button is-primary is-medium">
            Cartão Débito
          </button>
          <button class="button is-primary is-medium">
            Cartão Crédito
          </button>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import ClientSelect from '@/components/sales/ClientSelect.vue';

export default {
  data() {
    return {};
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  components: {
    ClientSelect,
  },
};
</script>

<style lang="scss">
.checkout-area {
  height: 100%;

  .client-section {
    padding-top: 1em;
    padding-bottom: 2em;
    border-bottom: 1px solid #eee;
  }

  .payment-type {
    margin-top: 2em;

    .payment-buttons {
      display: flex;
      flex-flow: row;
      flex-wrap: wrap;
      justify-content: space-between;

      button {
        width: 48%;
      }
    }

    .payment-buttons + .payment-buttons {
      margin-top: 1em;
    }
  }

  .cancel {
    vertical-align: bottom;

    a {
      color: red;
    }
  }
}
</style>
