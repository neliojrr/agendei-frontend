<template>
  <PanelTabs
    :items="itemsToShow"
    :back="items.length > 1"
    @go-back="items.pop()"
    @add-item="data.addItem"
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
  props: {
    data: {
      type: Object,
      default: () => ({ addItem: () => null }),
    },
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
          ...service,
          id: `s-${service.id}`,
          selectable: true,
          quantity: 1,
          discount: 0,
          service_id: service.id,
        }))),
      })));
    },

    loadProductCategories() {
      const { productCategories } = this.$store.state.product;
      this.items.push(productCategories.map(pc => ({
        id: pc.id,
        title: pc.name,
        action: () => this.items.push(pc.products.map(product => ({
          ...product,
          id: `p-${product.id}`,
          selectable: true,
          quantity: 1,
          discount: 0,
          product_id: product.id,
        }))),
      })));
    },
  },
};
</script>
