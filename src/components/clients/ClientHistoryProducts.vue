<template>
  <div class="client-history-products">
    <template v-if="products.length > 0">
      <div class="columns is-mobile" v-for="p in products" :key="p.id">
        <div class="column date is-narrow">
          <span class="subtitle is-5">
            {{ moment(p.created_at).format('DD') }}
          </span>
          <div class="subtitle is-5">
            {{ moment(p.created_at).format('MMM') }}
          </div>
        </div>
        <div class="column time is-flex is-narrow">
          <span class="subtitle is-6">
            {{ moment(p.created_at).format('H:mm') }}
          </span>
        </div>
        <div class="column service is-flex">
          <span class="subtitle is-6">
            {{ productName(p.product_id) }}
          </span>
        </div>
        <div class="column price is-flex is-narrow">
          <span class="subtitle is-5">
            {{ displayMoney(p.value) }}
          </span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="no-history-message is-centered">
        <p>
          <font-awesome-icon icon="spray-can" />
        </p>
        <p class="subtitle is-5">
          Sem histórico em produtos
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      productCategories: state => state.product.productCategories
    })
  },
  methods: {
    moment(date) {
      return moment(date);
    },
    productName(id) {
      let productName = '';
      this.productCategories.forEach(productCategory => {
        const product = productCategory.products.find(s => s.id === id);
        if (product) {
          productName = product.name;
        }
      });
      return productName;
    }
  }
};
</script>

<style scoped lang="scss">
@import '~bulma/sass/utilities/_all';
.client-history-products {
  max-height: 300px;
  overflow-y: auto;

  .columns {
    border-bottom: 1px solid $grey-lighter;

    .column {
      align-items: center;
      justify-content: center;
    }
  }

  .columns:last-child {
    border-bottom: 0;
  }

  .no-history-message {
    p {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    svg {
      font-size: 42px;
      color: $grey-light;
    }
  }
}
</style>
