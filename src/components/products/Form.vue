<template>
  <div class="product-category-form">
    <div class="field">
      <label class="label">Nome</label>
      <div class="control">
        <input
          v-model="productCategory.name"
          class="input"
          :class="{ 'is-danger': errors.name }"
          type="text"
          placeholder="Cabelo"
        >
      </div>
      <p v-for="message in errors.name" :key="message" class="help is-danger">
        {{ message }}
      </p>
    </div>
    <div class="field columns">
      <div class="control is-expanded column">
        <label class="label">Descrição</label>
        <textarea
          v-model="productCategory.description"
          class="textarea"
          :class="{ 'is-danger': errors.description }"
          placeholder="Produtos para cabelo"
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
      productCategory: this.data,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped lang="scss">
.product-category-form {
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
