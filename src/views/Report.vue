<template>
  <div>
    <Menu />
    <NavApp :title="title" />
    <div class="report app-content">
      <div class="columns is-mobile top-actions">
        <div class="column">&nbsp;</div>
        <div class="column is-narrow">
          <DateSelector
            :selectedDate="selectedDate"
            @change-date="changeDate"
          />
        </div>
      </div>
      <div class="columns report-title">
        <div class="column">
          <h2 class="title is-4">
            Vendas
          </h2>
          <p
            v-if="selectedDate.start.isSame(selectedDate.end)"
            class="subtitle is-5"
          >
            {{ selectedDate.start.format('dddd, D MMM YYYY') }}
          </p>
          <p v-else class="subtitle is-5">
            {{ selectedDate.start.format('D MMM YYYY') }}
            à
            {{ selectedDate.end.format('D MMM YYYY') }}
          </p>
        </div>
      </div>
      <div class="columns is-multiline report-tables">
        <div class="column is-half">
          <h2 class="subtitle is-5">Resumo de Vendas</h2>
          <Table
            :isBordered="true"
            :isStriped="true"
            :headers="summaryHeaders"
            :data="summaryReport"
            :mobileHidden="2"
          />
        </div>
        <div class="column is-half">
          <h2 class="subtitle is-5">Principais Serviços</h2>
          <Table
            :isBordered="true"
            :isStriped="true"
            :headers="serviceHeaders"
            :data="servicesReport"
            :mobileHidden="2"
          />
        </div>
        <div class="column is-half">
          <h2 class="subtitle is-5">Principais Produtos</h2>
          <Table
            :isBordered="true"
            :isStriped="true"
            :headers="serviceHeaders"
            :data="productsReport"
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
import { mapState, mapActions } from 'vuex';
import Table from '@/components/Table.vue';
import Menu from '@/components/Menu.vue';
import NavApp from '@/components/NavApp.vue';
import DateSelector from '@/components/DateSelector.vue';

export default {
  components: {
    Menu,
    NavApp,
    Table,
    DateSelector
  },
  props: {
    pageTitle: {
      type: String,
      required: false,
      default: 'Relatórios'
    },
    start: {
      type: String,
      required: false,
      default: null
    },
    end: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      title: this.pageTitle,
      selectedDate: {
        start: this.start ? moment(this.start) : moment(),
        end: this.start ? moment(this.end) : moment()
      },
      summaryHeaders: [
        {
          name: 'name',
          title: 'Tipo'
        },
        {
          name: 'quantity',
          title: 'Qtd Vendas'
        },
        {
          name: 'value',
          title: 'Total Bruto',
          format: this.displayMoney
        }
      ],
      serviceHeaders: [
        {
          name: 'name',
          title: 'Nome'
        },
        {
          name: 'quantity',
          title: 'Qtd Vendas'
        },
        {
          name: 'value',
          title: 'Total Bruto',
          format: this.displayMoney
        }
      ]
    };
  },
  computed: {
    ...mapState({
      salon: state => state.salon,
      user: state => state.user,
      services: state => state.report.services,
      products: state => state.report.products
    }),
    summaryReport() {
      return this.$store.getters['report/summaryReport'] || [];
    },
    servicesReport() {
      const report = this.$store.getters['report/servicesReport'] || {};
      const values = Object.values(report);
      if (values.length > 3) {
        return values.slice(0, 2).concat(report.total);
      }
      return values;
    },
    productsReport() {
      const report = this.$store.getters['report/productsReport'] || {};
      const values = Object.values(report);
      if (values.length > 3) {
        return values.slice(0, 2).concat(report.total);
      }
      return values;
    }
  },
  watch: {
    selectedDate() {
      const { start, end } = this.selectedDate;
      this.$router.push(
        `/reports?start=${start.format('YYYY-MM-DD')}&end=${end.format(
          'YYYY-MM-DD'
        )}`
      );
      this.getReports({ ...this.selectedDate, salon: this.salon });
    }
  },
  created() {
    this.getReports({ ...this.selectedDate, salon: this.salon });
  },
  methods: {
    ...mapActions('report', ['getReports']),

    changeDate(dates) {
      this.selectedDate = {
        start: moment(dates.start),
        end: moment(dates.end)
      };
    },

    moment(date = moment()) {
      return moment(date);
    }
  }
};
</script>

<style lang="scss">
.report {
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
