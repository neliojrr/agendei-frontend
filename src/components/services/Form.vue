<template>
  <div class="service-category-form">
    <div class="field">
      <label class="label">Nome</label>
      <div class="control">
        <input
          v-model="serviceCategory.name"
          class="input"
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
          v-model="serviceCategory.description"
          class="textarea"
          placeholder="Serviços relacionados a corte e penteados de cabelos"
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
      serviceCategory: this.data,
    };
  },
  updated() {
    console.log(this.errors);
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
.service-category-form {
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

