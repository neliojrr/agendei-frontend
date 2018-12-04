<template>
  <div>
    <Menu />
    <NavApp :title="title" />
    <div class="sales app-content">
      <div class="columns is-mobile top-actions">
        <div class="column">&nbsp;</div>
        <div class="column is-narrow">
          <DateSelector :daySelected="daySelected" @change-date="changeDate" />
        </div>
      </div>
      <div class="columns sales-title">
        <div class="column">
          <h2 class="title is-4">
            Vendas Diárias
          </h2>
          <p class="subtitle is-5">
            {{ daySelected.format('dddd, D MMM YYYY') }}
          </p>
        </div>
      </div>
      <div class="columns is-multiline sales-tables">
        <div class="column is-half">
          <h2 class="subtitle is-5">Resumo de Vendas</h2>
          <Table
            :isBordered="true"
            :isStriped="true"
            :headers="summaryHeaders"
            :data="summaryData"
            :mobileHidden="2"
          />
        </div>
        <div class="column is-half">
          <h2 class="subtitle is-5">Principais Serviços</h2>
          <Table
            :isBordered="true"
            :isStriped="true"
            :headers="serviceHeaders"
            :data="serviceData"
            :mobileHidden="2"
          />
        </div>
        <div class="column is-half">
          <h2 class="subtitle is-5">Principais Produtos</h2>
          <Table
            :isBordered="true"
            :isStriped="true"
            :headers="serviceHeaders"
            :data="serviceData"
            :mobileHidden="2"
          />
        </div>
        <div class="column is-half">
          <h2 class="subtitle is-5">Principais Pacotes</h2>
          <Table
            :isBordered="true"
            :isStriped="true"
            :headers="serviceHeaders"
            :data="serviceData"
            :mobileHidden="2"
          />
        </div>
        <div class="column is-half">
          <h2 class="subtitle is-5">Comissões</h2>
          <Table
            :isBordered="true"
            :isStriped="true"
            :headers="serviceHeaders"
            :data="serviceData"
            :mobileHidden="2"
          />
        </div>
      </div>
      <p class="subtitle is-7">
        Gerado: {{ moment().format('dddd, D MMM YYYY - H:mm') }}
      </p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import api from '@/utils/api-connect';
import Table from '@/components/Table.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import DateSelector from '@/components/DateSelector.vue';

export default {
  data() {
    return {
      title: this.pageTitle,
      daySelected: moment(),
      summaryHeaders: [
        {
          name: 'type',
          title: 'Tipo',
        },
        {
          name: 'sales',
          title: 'Qtd Vendas',
        },
        {
          name: 'total',
          title: 'Total Bruto',
        },
      ],
      summaryData: [
        {
          id: 1,
          type: 'Serviços',
          sales: '9',
          total: 'R$ 270',
        },
        {
          id: 2,
          type: 'Pacotes',
          sales: '2',
          total: 'R$ 420',
        },
        {
          id: 3,
          type: 'Total',
          sales: '11',
          total: 'R$ 710',
        },
      ],
      serviceHeaders: [
        {
          name: 'name',
          title: 'Nome',
        },
        {
          name: 'sales',
          title: 'Qtd Vendas',
        },
        {
          name: 'total',
          title: 'Total Bruto',
        },
      ],
      serviceData: [
        {
          id: 1,
          name: 'Corte de Cabelo',
          sales: '6',
          total: 'R$ 180',
        },
        {
          id: 2,
          name: 'Sobrancelha',
          sales: '3',
          total: 'R$ 90',
        },
        {
          id: 3,
          name: 'Total',
          sales: '9',
          total: 'R$ 270',
        },
      ],
    };
  },
  props: ['pageTitle'],
  components: {
    Menu,
    NavApp,
    Table,
    DateSelector,
  },
  created() {
    this.salon = JSON.parse(window.sessionStorage.getItem('salon'));
    this.user = JSON.parse(window.sessionStorage.getItem('user'));
    if (this.user && this.salon && this.user.id && this.salon.id) {
      const headers = {
        'access-token': this.user.token,
        uid: this.user.email,
        client: this.user.client,
      };
      api.get(`/salons/${this.salon.id}/transactions`, { headers })
        .then((response) => {
          const employees = response.data || [];
          this.data = employees;
        })
        .catch(() => {
          this.$toast.open({
            message: 'Não foi possível encontrar o cliente!',
            type: 'is-danger',
          });
        });
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    changeDate(date) {
      this.daySelected = moment(date);
    },
    moment(date = moment()) {
      return moment(date);
    },
  },
};
</script>

<style lang="scss">
.sales {
  height: calc(100vh - 52px);
  padding: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  .top-actions {
    text-align: right;
  }
}
</style>
