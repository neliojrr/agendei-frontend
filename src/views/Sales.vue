<template>
  <section>
    <Menu />
    <NavApp :title="pageTitle" />
    <div class="sales app-content">
      <div class="columns content">
        <SaleItemsList
          :sale="sale"
          @open-modal-select-item="openModalSelectItem"
          @remove-item="removeItem"
        />
        <div class="column" v-if="sale.items.length > 0">
          <CheckoutArea
            @set-client="setClient"
            @set-payment-type="setPaymentType"
            @set-sale-price="setSalePrice"
            :sale="sale"
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
import mutationTypes from '@/constants/mutation-types';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import SaleItemsList from '@/components/sales/SaleItemsList.vue';
import FormSelectItem from '@/components/sales/Form.vue';
import CheckoutArea from '@/components/sales/CheckoutArea.vue';

export default {
  data() {
    return {
      sale: {
        items: [],
        client: {},
        payment: null,
        price: 0
      }
    };
  },
  props: {
    pageTitle: {
      type: String,
      default: 'Nova Venda'
    },
    openSelectItem: {
      type: Boolean,
      default: false
    },
    appointment: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Menu,
    NavApp,
    SaleItemsList,
    CheckoutArea
  },
  computed: {
    ...mapState({
      salon: state => state.salon,
      user: state => state.user
    })
  },
  created() {
    if (this.openSelectItem) this.openModalSelectItem();

    if (this.appointment && this.appointment.id) {
      const { client, service, employee } = this.appointment;
      this.sale.client = client;
      const item = {
        ...service,
        employee,
        employee_id: employee.id,
        id: `s-${service.id}`,
        service_id: service.id,
        appointment_id: this.appointment.id,
        quantity: 1,
        discount: 0
      };
      this.addItem(item);
    }
  },
  watch: {
    sale: {
      handler(newSale) {
        this.sale.price = newSale.items.reduce((sum, item) => {
          const total = sum + item.quantity * item.price;
          return total;
        }, 0);
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('sale', { addSale: mutationTypes.ADD_SALE }),
    ...mapMutations('modal', ['addModal', 'removeModal', 'updateModalProps']),
    ...mapGetters('modal', ['isModalOpen']),

    openModalSelectItem() {
      const id = modalId.SELECT_ITEM_SALE;
      const data = { addItem: this.addItem };
      const props = {
        data,
        title: 'Selecione um item',
        content: FormSelectItem
      };
      this.addModal({ id, props });
    },

    addItem(item) {
      const itemAdded = this.sale.items.find(i => i.id === item.id);
      if (itemAdded) {
        this.sale.items = this.sale.items.map(i => {
          if (i.id === itemAdded.id) {
            const newItem = i;
            newItem.quantity += 1;
            return newItem;
          }
          return i;
        });
      } else {
        this.sale.items.push(item);
      }
      this.sale.price += item.price;
      const id = modalId.SELECT_ITEM_SALE;
      if (this.isModalOpen(id)) this.removeModal({ id });
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
        onConfirm: () => this.checkout()
      });
    },

    removeItem(item) {
      this.sale.items = this.sale.items.filter(i => i.id !== item.id);
      this.sale.price -= item.price;
    },

    checkout() {
      const newSale = {
        payment_type: this.sale.payment,
        client_id: this.sale.client ? this.sale.client.id : null,
        price: this.sale.price,
        transactions_attributes: this.sale.items.map(transaction => ({
          client_id: this.sale.client ? this.sale.client.id : null,
          user_id: transaction.employee ? transaction.employee.id : null,
          value: transaction.price,
          discount: transaction.discount,
          service_id: transaction.service_id,
          product_id: transaction.product_id,
          quantity: transaction.quantity,
          appointment_id: transaction.appointment_id
        }))
      };
      this.$emit('set-loading-overlay', true);
      api
        .post(`salons/${this.salon.id}/sales/`, { sale: newSale })
        .then(response => {
          const sale = response.data || {};
          this.addSale(sale);
          this.$router.push(`/sales/${sale.id}`);
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Venda finalizada com sucesso!',
            type: 'is-success'
          });
        })
        .catch(error => {
          const message =
            error && error.response && error.response.data
              ? error.response.data.message
              : null;
          this.$toast.open({
            message: `Impossível realizer o checkout para esse agendamento! ${message}`,
            type: 'is-danger'
          });
          this.$emit('set-loading-overlay', false);
        });
    }
  }
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
