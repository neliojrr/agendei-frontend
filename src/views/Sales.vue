<template>
  <section>
    <Menu />
    <NavApp :title="pageTitle" />
    <div class="sales app-content">
      <div class="columns">
        <div class="column is-two-thirds">
          <SaleItem
            v-for="item in items"
            :key="item.id"
            :item="item"
          />
          <div class="columns" v-if="items.length > 0">
            <div class="column add-new-item has-text-left-desktop has-text-left-tablet">
              <button
                @click="openModalSelectItem"
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
                <p class="column is-half-mobile has-text-grey-dark">R$130</p>
              </div>
            </div>
          </div>
          <div v-if="items.length === 0" class="is-empty">
            <img
              alt="add-to-cart"
              title="Adicionar item para venda"
              src="../assets/images/add_to_cart.svg"
            />
            <p class="has-text-grey-dark">
              Adicione algum item para realizar uma venda.
            </p>
            <button @click="openModalSelectItem" class="button is-primary">
              Adicionar um novo item
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import modalId from '@/utils/modalId';
import Menu from '../components/Menu.vue';
import NavApp from '../components/NavApp.vue';
import SaleItem from '../components/sales/SaleItem.vue';
import FormSelectItem from '../components/sales/Form.vue';

export default {
  data() {
    return {
      items: [],
    };
  },
  props: {
    pageTitle: {
      type: String,
      default: 'Nova Venda',
    },
    openSelectItem: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Menu,
    NavApp,
    SaleItem,
  },
  mounted() {
    if (this.openSelectItem) this.openModalSelectItem();
  },
  computed: mapState({
    serviceCategories: state => state.service.serviceCategories,
    productCategories: state => state.product.productCategories,
  }),
  methods: {
    ...mapMutations('modal', ['addModal', 'removeModal', 'updateModalProps']),
    ...mapGetters('modal', ['isModalOpen']),

    openModalSelectItem() {
      const id = modalId.SELECT_ITEM_SALE;
      const data = { addItem: this.addItem };
      const props = { data, title: 'Selecione um item', content: FormSelectItem };
      this.addModal({ id, props });
    },

    addItem(item) {
      this.items.push(item);
      const id = modalId.SELECT_ITEM_SALE;
      this.removeModal({ id });
    },
  },
};
</script>

<style lang="scss">
.sales {
  padding: 10px;

  .add-new-item {

    button {
      text-decoration: none;
    }
  }

  .total {
    margin-top: 8px;
  }

  .is-empty {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      height: 200px;

      @media screen and (max-width: 768px) {
        height: 150px;
      }
    }

    p {
      margin-top: 20px;
      font-size: 18px;

      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }

    button {
      margin-top: 20px;
    }
  }
}
</style>
