<template>
  <PanelTabs
    :items="itemsToShow"
    :back="items.length > 1"
    @go-back="items.pop()"
  />
</template>

<script>
import { api } from '@/utils/api-connect';
import PanelTabs from '../PanelTabs.vue';

export default {
  data() {
    return {
      items: [[
        {
          id: 'services',
          title: 'Serviços',
          icon: 'cut',
          action: this.loadServiceCategories,
        },
        {
          id: 'products',
          title: 'Produtos',
          icon: 'spray-can',
          action: this.loadProductCategories,
        },
        {
          id: 'packages',
          title: 'Pacotes',
          icon: 'box',
          action: () => this.items.push([]),
        },
      ]],
      item: '',
      salon: {},
    };
  },
  components: {
    PanelTabs,
  },
  created() {
    const salon = window.localStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
  },
  computed: {
    itemsToShow() {
      const itemsLength = this.items.length;
      return itemsLength > 0 ? this.items[itemsLength - 1] : [];
    },
  },
  methods: {
    loadServiceCategories() {
      this.$emit('set-loading-overlay', true);
      api.get(`/salons/${this.salon.id}/service_categories`)
        .then((response) => {
          const serviceCategories = response.data || [];
          this.items.push(serviceCategories.map(sc => ({
            id: sc.id,
            title: sc.name,
            action: () => this.items.push(sc.services.map(service => ({
              id: service.id,
              title: service.name,
              selectable: true,
              price: service.price,
            }))),
          })));
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar as categorias de serviços!',
            type: 'is-danger',
          });
        });
    },

    loadProductCategories() {
      this.$emit('set-loading-overlay', true);
      api.get(`/salons/${this.salon.id}/product_categories`)
        .then((response) => {
          const productCategories = response.data || [];
          this.items.push(productCategories.map(sc => ({
            id: sc.id,
            title: sc.name,
            action: () => this.items.push(sc.products.map(product => ({
              id: product.id,
              title: product.name,
              selectable: true,
              price: product.price,
            }))),
          })));
          this.$emit('set-loading-overlay', false);
        })
        .catch(() => {
          this.$emit('set-loading-overlay', false);
          this.$toast.open({
            message: 'Não foi possível encontrar as categorias dos produtos!',
            type: 'is-danger',
          });
        });
    },
  },
};
</script>
