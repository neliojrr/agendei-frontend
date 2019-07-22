<template>
  <section>
    <Menu />
    <NavApp :title="pageTitle" />
    <div class="sale-view app-content">
      <div v-show="sale.id" class="columns content">
        <div class="column is-two-thirds invoice-area">
          <div class="invoice is-multiline">
            <div class="header">
              <h3 class="title">Invoice #{{ sale.id }}</h3>
              <h6 class="subtitle has-text-grey">{{ dateCreated }}</h6>
            </div>
            <hr />
            <ul class="items">
              <li v-for="item in sale.transactions" :key="item.id">
                <p class="quantity has-text-grey">
                  {{ item.quantity }}&nbsp;
                  {{ item.quantity === 1 ? 'item' : 'itens' }}
                </p>
                <span class="name has-text-grey-dark has-text-weight-semibold">
                  {{ item.name }}
                </span>
                <span class="price has-text-grey-dark has-text-weight-semibold">
                  {{ displayMoney(item.value) }}
                </span>
              </li>
            </ul>
            <hr />
            <div class="total">
              <span class="has-text-grey-dark has-text-weight-semibold">
                Total
              </span>
              <span class="has-text-grey-dark has-text-weight-semibold">
                {{ displayMoney(sale.price) }}
              </span>
            </div>
            <hr />
            <div class="total">
              <span class="has-text-grey-dark has-text-weight-semibold">
                Pagamento por {{ paymentType }}
              </span>
              <span class="has-text-grey-dark has-text-weight-semibold">
                {{ displayMoney(sale.price) }}
              </span>
            </div>
          </div>
        </div>
        <div class="column invoice-success">
          <div class="box">
            <div class="columns is-multiline">
              <section class="column is-full client-section">
                <font-awesome-icon icon="user-circle" />
                <span class="has-text-grey-dark has-text-weight-semibold">
                  {{ sale.client ? sale.client.name : 'Sem Cliente' }}
                </span>
              </section>
              <section class="column is-full date-section">
                <img
                  alt="empty results"
                  title="Nao encontrado"
                  src="../assets/images/success2.svg"
                />
                <span class="has-text-success has-text-weight-semibold">
                  Finalizado
                </span>
                <br />
                <span class="has-text-grey">
                  Pagamento recebido em {{ dateCreated }} às&nbsp;
                  {{ hourCreated }} horas
                </span>
              </section>
              <section class="column is-full send-email">
                <label class="label">Enviar invoice</label>
                <div class="field has-addons">
                  <p class="control is-expanded">
                    <input
                      v-model="email"
                      class="input"
                      type="email"
                      placeholder="Email"
                    />
                  </p>
                  <p class="control">
                    <a class="button" @click="sendInvoice">
                      Enviar
                    </a>
                  </p>
                </div>
              </section>
              <section class="column is-full close-button">
                <div>
                  <button
                    type="button"
                    class="button is-info is-medium"
                    @click="$router.push('/agenda')"
                  >
                    Fechar
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import moment from 'moment';
import { api } from '@/utils/api-connect';
import paymentType from '@/constants/payment-type';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';

export default {
  data() {
    return {
      sale: {},
      email: ''
    };
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    pageTitle: {
      type: String,
      default: 'Vendas'
    }
  },
  components: {
    Menu,
    NavApp
  },
  computed: {
    dateCreated() {
      return moment(this.sale.created_at).format('dddd, DD MMM YYYY');
    },
    hourCreated() {
      return moment(this.sale.created_at).format('HH:mm');
    },
    paymentType() {
      return paymentType[this.sale.payment_type];
    },
    ...mapState({
      salon: state => state.salon,
      user: state => state.user,
      sales: state => state.sale.all,
      isFetching: state => state.sale.isFetching
    })
  },
  watch: {
    isFetching(newIsFetching, oldIsFetching) {
      if (!oldIsFetching && newIsFetching) {
        this.$emit('set-loading-overlay', true);
      }
      if (oldIsFetching && !newIsFetching) {
        this.sale = this.sales.find(sale => sale.id === this.id) || {};
        this.$emit('set-loading-overlay', false);
      }
    }
  },
  created() {
    this.sale = this.sales.find(sale => sale.id === this.id) || {};
    if (!this.sale.id) {
      this.getSale({ salon: this.salon, saleId: this.id });
    }
  },
  methods: {
    ...mapActions('sale', ['getSale']),

    sendInvoice() {
      api
        .post(`sales/${this.sale.id}/send-invoice/`, {
          id: this.sale.id,
          email: this.email
        })
        .then(() => {})
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
.sale-view {
  padding: 10px;
  overflow-y: auto;

  .content {
    .invoice-area {
      display: flex;
      overflow-y: none;

      .invoice {
        margin: auto;
        width: 50%;
        border: 1px solid #dee3e7;
        box-shadow: 0 0 10px 0 #ccc;
        padding: 10px;
        padding-bottom: 30px;

        @media screen and (min-width: 0px) and (max-width: 412px) {
          width: 100%;
        }

        @media screen and (min-width: 413px) and (max-width: 600px) {
          width: 90%;
        }

        @media screen and (min-width: 601px) and (max-width: 1260px) {
          width: 70%;
        }

        .header {
          padding-top: 30px;
          padding-bottom: 10px;
        }

        hr {
          background-color: #eeeeee;
          height: 1px;
        }

        .items {
          li {
            text-align: left;
            list-style: none;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;

            .quantity {
              margin-bottom: 0;
              font-size: 14px;
            }

            .price {
              float: right;
              margin-right: 1em;
            }
          }

          li:last-child {
            border-bottom: 0;
          }
        }

        .total {
          display: flex;
          margin-left: 2em;
          justify-content: space-between;
          margin-right: 1em;
        }
      }
    }

    .invoice-success {
      .box {
        .columns {
          height: 100%;
        }
      }

      .client-section {
        display: flex;
        align-items: center;
        text-align: left;
        border-bottom: 1px solid #eee;

        .fa-user-circle {
          font-size: 42px;
        }

        span {
          margin-left: 15px;
          font-size: 20px;
        }
      }

      .date-section {
        height: 65%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          height: 150px;
          width: 100%;
          margin-bottom: 1em;
        }

        span {
          font-size: 18px;
        }
      }

      .send-email {
        border-bottom: 1px solid #eee;

        label {
          text-align: left;
        }
      }

      .close-button {
        height: 13%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      }
    }
  }
}
</style>
