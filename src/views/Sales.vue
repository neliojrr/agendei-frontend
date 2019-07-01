<template>
  <section>
    <Menu />
    <NavApp :title="pageTitle" />
    <div class="sales app-content">
      <div class="columns content">
        <div class="column is-two-thirds sales-items">
          <SaleItem
            v-for="item in sale.items"
            :key="item.id"
            :cartItem="item"
          />
          <div class="columns" v-if="sale.items.length > 0">
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
                <p class="column is-half-mobile has-text-grey-dark">
                  {{ displayMoney(totalValue)}}
                </p>
              </div>
            </div>
          </div>
          <div v-if="sale.items.length === 0" class="is-empty">
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
        <div class="column" v-if="sale.items.length > 0">
          <CheckoutArea
            @set-client="setClient"
            @set-payment-type="setPaymentType"
            @set-sale-price="setSalePrice"
            :total="totalValue"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import modalId from '@/utils/modalId';
import { api } from '@/utils/api-connect';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import SaleItem from '@/components/sales/SaleItem.vue';
import FormSelectItem from '@/components/sales/Form.vue';
import CheckoutArea from '@/components/sales/CheckoutArea.vue';

export default {
  data() {
    return {
      sale: {
        items: [],
        client: null,
        payment: null,
        price: 0,
      },
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
    CheckoutArea,
  },
  mounted() {
    if (this.openSelectItem) this.openModalSelectItem();
  },
  computed: {
    totalValue() {
      return this.sale.items.reduce((total, item) => (total + item.price), 0);
    },
    ...mapState({
      salon: state => state.salon,
      user: state => state.user,
      serviceCategories: state => state.service.serviceCategories,
      productCategories: state => state.product.productCategories,
    }),
  },
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
      this.sale.items.push(item);
      this.sale.price += item.price;
      const id = modalId.SELECT_ITEM_SALE;
      this.removeModal({ id });
    },

    setClient(client) {
      this.sale.client = client;
    },

    setSalePrice(price) {
      this.sale.price = price;
    },

    setPaymentType(payment) {
      this.sale.payment = payment;
      this.$dialog.confirm({
        message: 'Finalizar venda?',
        cancelText: 'Cancelar',
        confirmText: 'Ok',
        onConfirm: () => this.checkout(),
      });
    },

    checkout() {
      const newSale = {
        payment_type: this.sale.payment,
        client_id: this.sale.client ? this.sale.client.id : null,
        price: this.sale.price,
        transactions_attributes: this.sale.items.map(transaction => ({
          user_id: transaction.employee ? transaction.employee.id : null,
          value: transaction.price,
          discount: transaction.discount,
          service_id: transaction.service_id,
          product_id: transaction.product_id,
          quantity: transaction.quantity,
        })),
      };
      this.$emit('set-loading-overlay', true);
      api.post(`salons/${this.salon.id}/sales/`, { sale: newSale })
        .then((response) => {
          const sale = response.data || {};
          this.$router.push(`/sales/${sale.id}`);
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Venda finalizada com sucesso!',
            type: 'is-success',
          });
        })
        .catch((error) => {
          const message = error && error.response && error.response.data ?
            error.response.data.message :
            null;
          this.$toast.open({
            message: `Impossível realizer o checkout para esse agendamento! ${message}`,
            type: 'is-danger',
          });
          this.$emit('set-loading-overlay', false);
        });
    },
  },
};
</script>

<style lang="scss">
.sales {
  padding: 10px;
  overflow: none;

  .content {
    height: 100%;

    .sales-items {
      overflow-y: auto;
    }
  }

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
