<template>
  <b-collapse
    class="panel"
    :open.sync="isOpen"
  >
    <div slot="trigger" class="panel-heading">
      <span v-if="isOpen">
        <font-awesome-icon icon="chevron-up" />
      </span>
      <span v-else>
        <font-awesome-icon icon="chevron-down" />
      </span>
      <strong>{{ productCategory.name }}</strong>
      <b-dropdown
        aria-role="list"
        position="is-bottom-left"
        class="cog-menu"
      >
        <button class="button is-text" slot="trigger">
          <span class="icon is-small">
            <font-awesome-icon icon="cog" />
          </span>
        </button>
        <b-dropdown-item
          aria-role="listitem"
          @click="$emit('open-modal-new-product', productCategory.id)"
        >
          Adicionar Produto
        </b-dropdown-item>
        <b-dropdown-item
          aria-role="listitem"
          @click="$emit('open-modal-edit-product-category', productCategory)"
        >
          Editar
        </b-dropdown-item>
        <b-dropdown-item
          aria-role="listitem"
          @click="$emit('delete-product-category', productCategory.id)"
        >
          Excluir
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="panel-block">
      <Table
        :isStriped="true"
        :mobileHidden="3"
        :headers="headers"
        :data="productCategory.products"
        @row-click="rowClick"
      />
    </div>
  </b-collapse>
</template>

<script>
import Table from '@/components/Table.vue';

export default {
  data() {
    return {
      isOpen: false,
      isCogOpen: false,
      headers: [
        {
          name: 'name',
          title: 'Nome',
        },
        {
          name: 'price',
          title: 'Preço',
          format: value => (`R$ ${value}`),
        },
      ],
    };
  },
  props: ['productCategory'],
  components: {
    Table,
  },
  methods: {
    rowClick(product) {
      this.$emit('edit-product', product);
    },
  },
};
</script>

<style scoped lang="scss">
.panel-heading {
  text-align: left;
  display: flex;
  align-items: center;

  span {
    margin-right: 20px;
  }

  strong {
    @media screen and (max-width: 1024px) {
      font-size: 16px;
    }
  }

  .cog-menu {
    margin-left: auto;
  }

  .cog-menu:hover {
    color: #000000;
  }

  .cog-menu:focus {
    box-shadow: none;
  }

  .dropdown-menu {
    margin-left: -5.8em;
  }
}
</style>
