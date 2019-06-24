<template>
  <div class="sale-item box">
    <header class="box-header columns is-mobile">
      <div
        class="box-header-title column is-two-thirds-mobile
              is-three-quarters-desktop is-three-quarters-tablet"
      >
        <p class="title is-5">
          {{ item.name }}
        </p>
      </div>
      <div class="column item-price">
        <p class="is-size-6 has-text-dark has-text-weight-semibold">
          {{ displayMoney(item.price) }}
        </p>
      </div>
      <span class="delete-item column">
        <button type="button" class="delete"></button>
      </span>
      <p
        v-if="!!item.employee && !!item.service_category_id"
        class="box-header-subtitle column is-11 subtitle is-6 has-text-grey"
      >
        {{ duration(item.duration) }} com {{ item.employee.name }}
      </p>
    </header>
    <div class="box-content field columns is-mobile is-multiline">
      <div class="column control is-one-quarter-mobile">
        <label class="label has-text-weight-medium">Qtd</label>
        <div class="control">
          <input
            v-model="item.quantity"
            :disabled="!!item.service_category_id"
            class="input"
            type="text"
          />
        </div>
      </div>
      <div class="column control is-half-desktop is-one-third-tablet is-three-quarters-mobile">
        <label class="label">Profissional</label>
        <div class="control">
          <b-autocomplete
            v-model="name"
            :data="filteredDataObj"
            :open-on-focus="true"
            ref="autocomplete"
            field="name"
            placeholder="Digite para pesquisar"
            @select="setEmployee"
          >
            <template slot="header">
              <a>
                <span> Adicionar novo profissional </span>
              </a>
            </template>
            <template slot="empty">Sem resultados para {{ name }}</template>
          </b-autocomplete>
        </div>
      </div>
      <div class="column is-one-fifth-desktop is-one-fourth-tablet control">
        <label class="label">Preço</label>
        <div class="control has-icons-left">
          <input
            :value="displayRawMoney(item.price)"
            class="input"
            type="text"
            placeholder="R$4,45"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="dollar-sign" />
          </span>
        </div>
      </div>
      <div class="column control is-one-fifth-desktop is-one-fourth-tablet">
        <label class="label">Desconto</label>
        <div class="control has-icons-left">
          <input
            :value="displayRawMoney(item.discount)"
            class="input"
            type="text"
            placeholder="R$5,00"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="dollar-sign" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      item: this.cartItem,
      name: '',
    };
  },
  props: {
    cartItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filteredDataObj() {
      return this.employees.filter(option => option.name
        .toString()
        .toLowerCase()
        .indexOf(this.name.toLowerCase()) >= 0);
    },
    employees() {
      return this.$store.state.employee.all;
    },
  },
  methods: {
    duration(duration) {
      return moment.duration(duration, 's').locale('pt').humanize();
    },

    setEmployee(employee) {
      this.item.employee = employee;
      this.item.employee_id = employee.id;
    },
  },
};
</script>

<style lang="scss">
.sale-item {

  .box-header {
    margin-bottom: 0;
  }

  .box-header-title {
    text-align: left;
    margin-bottom: 0;
    padding-bottom: 0.3em;
  }

  .box-header-subtitle {
    text-align: left;
    padding-top: 0;
  }

  .item-price {
    padding-bottom: 0.3em;
  }

  .delete-item {
    margin-left: auto;
    margin-right: 0;
    padding-bottom: 0.3em;
    text-align: right;
  }

  .box-content {
    margin-top: 0px;
  }
}
</style>
