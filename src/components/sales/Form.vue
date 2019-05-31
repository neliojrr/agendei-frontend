<template>
  <PanelTabs
    :items="itemsToShow"
    :back="items.length > 1"
    @go-back="items.pop()"
  />
</template>

<script>
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
      const { serviceCategories } = this.$store.state.service;
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
    },

    loadProductCategories() {
      const { productCategories } = this.$store.state.product;
      this.items.push(productCategories.map(pc => ({
        id: pc.id,
        title: pc.name,
        action: () => this.items.push(pc.products.map(product => ({
          id: product.id,
          title: product.name,
          selectable: true,
          price: product.price,
        }))),
      })));
    },
  },
};
</script>
