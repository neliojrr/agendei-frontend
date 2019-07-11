<template>
  <div class="column is-two-thirds sales-items">
    <SaleItem
      v-for="item in sale.items"
      :key="item.id"
      :cartItem="item"
      @remove-item="$emit('remove-item')"
    />
    <div class="columns" v-if="sale.items.length > 0">
      <div class="column add-new-item has-text-left-desktop has-text-left-tablet">
        <button
          @click="$emit('open-modal-select-item')"
          class="button is-text has-text-link"
        >
          + Adicionar novo item
        </button>
      </div>
      <div class="total column">
        <div class="columns is-mobile">
          <p
            class="column is-half-mobile has-text-grey-dark has-text-weight-semibold"
          >
            Total:
          </p>
          <p class="column is-half-mobile has-text-grey-dark">
            {{ displayMoney(this.sale.price)}}
          </p>
        </div>
      </div>
    </div>
    <div v-if="sale.items.length === 0" class="is-empty">
      <img
        alt="add-to-cart"
        title="Adicionar item para venda"
        src="../../assets/images/add_to_cart.svg"
      />
      <p class="has-text-grey-dark">
        Adicione algum item para realizar uma venda.
      </p>
      <button @click="$emit('open-modal-select-item')" class="button is-primary">
        Adicionar um novo item
      </button>
    </div>
  </div>
</template>

<script>
import SaleItem from '@/components/sales/SaleItem.vue';

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
    SaleItem,
  },
};
</script>
