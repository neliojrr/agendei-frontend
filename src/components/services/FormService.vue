<template>
  <div class="service-form">
    <div class="field">
      <label class="label">Nome</label>
      <div class="control">
        <input
          v-model="service.name"
          class="input"
          type="text"
          placeholder="Corte de Cabelo"
        />
      </div>
      <p v-if="errors.name" class="help is-danger">{{ errors.name }}</p>
    </div>
    <div class="field columns">
      <div class="control is-expanded column">
        <label class="label">Descrição</label>
        <textarea
          v-model="service.description"
          class="textarea"
          placeholder="Corte de cabelo tradicional"
        />
        <p v-if="errors.description" class="help is-danger">{{ errors.description }}</p>
      </div>
    </div>
    <div class="field columns">
      <div class="column control">
        <label class="label">Preço de Custo</label>
        <div class="control has-icons-left">
          <input
            v-model="service.cost"
            class="input"
            type="number"
            placeholder="Preço de custo do serviço"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="dollar-sign" />
          </span>
          <p v-if="errors.cost" class="help is-danger">{{ errors.cost }}</p>
        </div>
      </div>
      <div class="column control">
        <label class="label">Preço de Venda</label>
        <div class="control has-icons-left">
          <input
            v-model="service.price"
            class="input"
            type="number"
            placeholder="Preço de venda do serviço"
          />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="dollar-sign" />
          </span>
          <p v-if="errors.price" class="help is-danger">{{ errors.price }}</p>
        </div>
      </div>
    </div>
    <div class="field columns">
      <div class="column control">
        <label class="label">Duração</label>
        <div class="select full-width">
          <select class="full-width" v-model="service.duration">
            <option v-for="d in durationOptions" :key="d.value" :value="d.value">
              {{ d.title }}
            </option>
          </select>
        </div>
        <p v-if="errors.duration" class="help is-danger">{{ errors.duration }}</p>
      </div>
      <div class="control column">
        <label class="label">Categoria</label>
        <div class="select full-width">
          <select class="full-width" v-model="service.service_category_id">
            <option v-for="sc in serviceCategories" :key="sc.id" :value="sc.id">
              {{ sc.name }}
            </option>
          </select>
        </div>
        <p v-if="errors.category" class="help is-danger">{{ errors.category }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import serviceDuration from '@/utils/serviceDuration';

export default {
  data() {
    return {
      service: this.data.service,
      serviceCategories: this.data.serviceCategories,
      durationOptions: serviceDuration,
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
.service-form {
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

  .full-width {
    width: 100%;
  }
}
</style>

