<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        {{ content }}
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">{{ saveButtonText }}</button>
        <button class="button" @click="$emit('close')">{{ cancelButtonText }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: Object,
      default: null,
    },
    saveButtonText: {
      type: String,
      default: 'Salvar',
    },
    cancelButtonText: {
      type: String,
      default: 'Cancelar',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
