<template>
  <b-collapse
    class="panel"
    :open.sync="isOpen"
  >
    <div slot="trigger" @click="isOpen = !isOpen" class="panel-heading">
      <span v-if="isOpen">
        <font-awesome-icon icon="chevron-up" />
      </span>
      <span v-else>
        <font-awesome-icon icon="chevron-down" />
      </span>
      <strong>{{ serviceCategory.name }}</strong>
      <div class="cog-menu dropdown" :class="{ 'is-active': isCogOpen }">
        <div class="dropdown-trigger">
          <button
            class="cog-menu button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            @click.stop="isCogOpen = !isCogOpen"
            @blur="isCogOpen = false"
          >
            <span><font-awesome-icon icon="cog" /></span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content" >
            <a
              href="#"
              class="dropdown-item"
              @mousedown="$emit('open-modal-new-service', serviceCategory.id)"
            >
              Adicionar Serviço
            </a>
            <a
              href="#"
              class="dropdown-item"
              @mousedown="$emit('open-modal-edit-service-category', serviceCategory)"
            >
              Editar
            </a>
            <a
              href="#"
              class="dropdown-item"
              @mousedown="$emit('delete-service-category', serviceCategory.id)"
            >
              Excluir
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-block">
      <Table
        :isStriped="true"
        :mobileHidden="3"
        :headers="headers"
        :data="serviceCategory.services"
        @row-click="rowClick"
      />
    </div>
  </b-collapse>
</template>

<script>
import formatDuration from '@/utils/formatDuration';
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
          name: 'duration',
          title: 'Duração',
          format: value => formatDuration(value),
        },
        {
          name: 'price',
          title: 'Preço',
          format: value => (`R$ ${value}`),
        },
      ],
    };
  },
  props: ['serviceCategory'],
  components: {
    Table,
  },
  methods: {
    rowClick(id) {
      this.$emit('edit-service', id);
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
    color: #666666;
    border: 0;
    background: none;
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

