<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <component :is="content" />
      </section>
      <footer class="modal-card-foot">
        <button
          v-for="b in buttons"
          :key="b.title"
          class="button"
          :class="b.class"
          @click="b.action"
        >
          {{ b.title }}
        </button>
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
    buttons: {
      type: Array,
      default: () => [{
        title: 'Salvar',
        class: 'is-success',
        action: () => null,
      }],
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
