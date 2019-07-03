<template>
  <div class="checkout-area box">
    <section class="columns is-multiline">
      <section class="column is-full client-section">
        <ClientSelect @set-client="setClient" :client="sale.client" />
      </section>
      <section class="column is-full">
        <div class="field">
          <label class="label">Valor</label>
          <div class="control has-icons-left">
            <input
              class="input is-medium"
              type="text"
              :value="displayRawMoney(sale.price)"
              @change="setPrice"
            />
            <span class="icon is-small is-left">
              <font-awesome-icon icon="dollar-sign" />
            </span>
          </div>
        </div>
      </section>
      <section class="column is-full payment-type">
        <div class="payment-buttons">
          <button
            type="button"
            class="button is-primary is-medium"
            @click="$emit('set-payment-type', 'cash')"
          >
            Dinheiro
          </button>
          <button
            type="button"
            class="button is-primary is-medium"
            @click="$emit('set-payment-type', 'other')"
          >
            Outro
          </button>
        </div>
        <div class="payment-buttons">
          <button
            type="button"
            class="button is-primary is-medium"
            @click="$emit('set-payment-type', 'debit_card')"
          >
            Cartão Débito
          </button>
          <button
            type="button"
            class="button is-primary is-medium"
            @click="$emit('set-payment-type', 'credit_card')"
          >
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
    sale: {
      type: Object,
      required: true,
    },
  },
  components: {
    ClientSelect,
  },
  methods: {
    setClient(client) {
      this.$emit('set-client', client);
    },

    setPrice(e) {
      this.$emit('set-sale-price', parseInt(e.target.value * 100, 10));
    },
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
