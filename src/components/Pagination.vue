<template>
  <nav
    v-if="page > 1 || itemsCount > defaultItemsCount"
    class="pagination is-centered"
    role="navigation"
    aria-label="pagination"
  >
    <a
      :disabled="page === 1"
      @click="$emit('change-page', page - 1)"
      class="pagination-previous"
    >
      <i class="fa fa-chevron-left" /> Anterior
    </a>
    <a
      :disabled="itemsCount <= defaultItemsCount"
      @click="$emit('change-page', page + 1)"
      class="pagination-next"
    >
      Próxima <i class="fa fa-chevron-right" />
    </a>
  </nav>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true
    },
    itemsCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      defaultItemsCount: 29
    };
  }
};
</script>

<style lang="scss">
.pagination {
  margin-bottom: 2em;

  .fa-chevron-left {
    margin-right: 0.5em;
  }

  .fa-chevron-right {
    margin-left: 0.5em;
  }
}
</style>
