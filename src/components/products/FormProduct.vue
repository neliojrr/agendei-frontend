<template>
  <div class="product-form">
    <div class="field">
      <label class="label">Nome</label>
      <div class="control">
        <input
          v-model="product.name"
          class="input"
          :class="{ 'is-danger': errors.name }"
          type="text"
          placeholder="Shampoo"
        >
      </div>
      <p v-for="message in errors.name" :key="message" class="help is-danger">
        {{ message }}
      </p>
    </div>
    <div class="field">
      <label class="label">Categoria</label>
      <div class="control">
        <b-autocomplete
          v-model="productCategorySelected.name"
          :data="filteredDataObj"
          :open-on-focus="true"
          field="name"
          ref="autocomplete"
          placeholder="Digite para pesquisar"
          @select="setProductCategory">
          <template slot="empty">
            Sem resultados para {{ this.productCategorySelected.name }}
          </template>
        </b-autocomplete>
      </div>
      <p v-for="message in errors.name" :key="message" class="help is-danger">
        {{ message }}
      </p>
    </div>
    <div class="field columns is-mobile">
      <div class="column control">
        <label class="label">Preço de Custo</label>
        <div class="control has-icons-left">
          <input
            v-model="product.cost"
            class="input"
            :class="{ 'is-danger': errors.cost }"
            type="number"
            placeholder="Preço de custo do produto"
            step="any"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="dollar-sign" />
          </span>
          <p v-for="message in errors.cost" :key="message" class="help is-danger">
            {{ message }}
          </p>
        </div>
      </div>
      <div class="column control">
        <label class="label">Preço de Venda</label>
        <div class="control has-icons-left">
          <input
            v-model="product.price"
            class="input"
            :class="{ 'is-danger': errors.price }"
            type="number"
            placeholder="Preço de venda do produto"
            step="0.1"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="dollar-sign" />
          </span>
          <p v-for="message in errors.price" :key="message" class="help is-danger">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
    <div class="field columns is-mobile">
      <div class="column control">
        <label class="label">Marca</label>
        <div class="control">
          <input
            v-model="product.brand"
            class="input"
            :class="{ 'is-danger': errors.brand }"
            type="text"
            placeholder="Dove"
          />
          <p v-for="message in errors.brand" :key="message" class="help is-danger">
            {{ message }}
          </p>
        </div>
      </div>
      <div class="column control is-one-third">
        <label class="label">Quantidade</label>
        <div class="control">
          <input
            v-model="product.quantity"
            class="input"
            :class="{ 'is-danger': errors.quantity }"
            type="number"
            step="1"
          />
          <p v-for="message in errors.quantity" :key="message" class="help is-danger">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
    <div class="field columns">
      <div class="control is-expanded column">
        <label class="label">Descrição</label>
        <textarea
          v-model="product.description"
          class="textarea"
          :class="{ 'is-danger': errors.description }"
          placeholder="Shampoo especial para cabelos quebradiços"
        />
        <p v-for="message in errors.description" :key="message" class="help is-danger">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: this.data.product,
      productCategories: this.data.productCategories,
      productCategorySelected: { name: '' },
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({ product: {}, productCategories: [] }),
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    filteredDataObj() {
      return this.productCategories.filter(option => option.name
        .toString()
        .toLowerCase()
        .indexOf(this.productCategorySelected.name.toLowerCase()) >= 0);
    },
  },
  created() {
    if (this.product && this.product.product_category_id > -1) {
      this.productCategorySelected = this.productCategories.find(
        pc => pc.id === this.product.product_category_id
      );
    }
  },
  methods: {
    setProductCategory(productCategory) {
      this.product.productCategory = productCategory;
      this.product.product_category_id =
        productCategory ? productCategory.id : null;
    },
  },
};
</script>

<style scoped lang="scss">
.product-form {
  text-align: left;

  .columns {
    margin-bottom: 0;
    margin-top: 0;

    .column {
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 0.75rem;
    }
  }
}
</style>
