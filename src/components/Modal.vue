<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <component :is="content" v-bind="data" :errors="errors" :allDisabled="allDisabled" />
      </section>
      <footer class="modal-card-foot">
        <button
          v-if="buttons.length > 0"
          v-for="b in buttons"
          :key="b.title"
          class="button"
          :class="b.class"
          @click="b.action(data)"
        >
          {{ b.title }}
        </button>
        <b-dropdown
          aria-role="list"
          v-if="dropdown.length > 0"
          position="is-top-left"
        >
          <button class="button" slot="trigger">
            <span>Opções</span>
            <span class="icon is-small">
              <font-awesome-icon icon="chevron-up" />
            </span>
          </button>

          <b-dropdown-item
            aria-role="listitem"
            v-for="drop in dropdown"
            :class="drop.class"
            :key="drop.title"
            @click="drop.action(data)"
          >
            {{ drop.title }}
          </b-dropdown-item>
        </b-dropdown>
        <button class="button is-text" @click="$emit('close')">{{ cancelButtonText }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
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
    data: {
      type: Object,
      default: () => {},
    },
    errors: {
      type: Object,
      default: () => {},
    },
    buttons: {
      type: Array,
      default: () => [{
        title: 'Salvar',
        class: 'is-success',
        action: () => null,
      }],
    },
    dropdown: {
      type: Array,
      default: () => [],
    },
    cancelButtonText: {
      type: String,
      default: 'Cancelar',
    },
    show: {
      type: Boolean,
      default: false,
    },
    allDisabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      if (!this.show) {
        this.isActive = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  z-index: 100;

  .dropdown-content {

    a {
      padding-right: 0;
      padding-left: 0;
    }
  }
}
</style>
