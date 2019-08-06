<template>
  <PanelTabs
    :items="itemsToShow"
    :back="items.length > 1"
    :isLoading="isLoading"
    @go-back="items.pop()"
    @add-item="data.addItem"
    @search="search"
  />
</template>

<script>
import PanelTabs from '../PanelTabs.vue';

export default {
  components: {
    PanelTabs
  },
  props: {
    data: {
      type: Object,
      default: () => ({ addItem: () => null })
    }
  },
  data() {
    return {
      defaultItems: [
        [
          {
            id: 'services',
            title: 'Serviços',
            icon: 'cut',
            action: this.loadServiceCategories
          },
          {
            id: 'products',
            title: 'Produtos',
            icon: 'spray-can',
            action: this.loadProductCategories
          }
        ]
      ],
      items: [],
      item: '',
      salon: {},
      isLoading: false
    };
  },
  computed: {
    itemsToShow() {
      const itemsLength = this.items.length;
      return itemsLength > 0 ? this.items[itemsLength - 1] : [];
    }
  },
  created() {
    const salon = window.localStorage.getItem('salon') || '{}';
    this.salon = JSON.parse(salon) || {};
    this.items = this.defaultItems;
  },
  methods: {
    loadServiceCategories() {
      const { serviceCategories } = this.$store.state.service;
      this.items.push(
        serviceCategories.map(sc => ({
          id: sc.id,
          title: sc.name,
          action: () =>
            this.items.push(
              sc.services.map(service => ({
                ...service,
                id: `s-${service.id}`,
                selectable: true,
                quantity: 1,
                discount: 0,
                service_id: service.id
              }))
            )
        }))
      );
    },

    loadProductCategories() {
      const { productCategories } = this.$store.state.product;
      this.items.push(
        productCategories.map(pc => ({
          id: pc.id,
          title: pc.name,
          action: () =>
            this.items.push(
              pc.products.map(product => ({
                ...product,
                id: `p-${product.id}`,
                selectable: true,
                quantity: 1,
                discount: 0,
                product_id: product.id
              }))
            )
        }))
      );
    },

    search(query = '') {
      this.isLoading = true;
      if (query === '') {
        this.items = this.defaultItems;
      } else {
        const { productCategories } = this.$store.state.product;
        const { serviceCategories } = this.$store.state.service;
        this.items = [
          productCategories.reduce((items, productCategory) => {
            const filteredItems = productCategory.products
              .filter(
                product => product.name.toLowerCase().indexOf(query) !== -1
              )
              .map(product => ({
                ...product,
                id: `p-${product.id}`,
                selectable: true,
                quantity: 1,
                discount: 0,
                product_id: product.id
              }));

            return items.concat(filteredItems);
          }, [])
        ];
        this.items.concat(
          serviceCategories.reduce((items, serviceCategory) => {
            const filteredItems = serviceCategory.services
              .filter(
                service => service.name.toLowerCase().indexOf(query) !== -1
              )
              .map(service => ({
                ...service,
                id: `p-${service.id}`,
                selectable: true,
                quantity: 1,
                discount: 0,
                service_id: service.id
              }));

            return items.concat(filteredItems);
          }, [])
        );
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  }
};
</script>
