<template>
  <div class="client-select">
    <b-autocomplete
      v-model="name"
      :data="filteredDataObj"
      :open-on-focus="true"
      ref="autocomplete"
      field="name"
      icon="search"
      size="is-medium"
      placeholder="Pesquisar Cliente"
      @select="setClient"
    >
      <template slot="header">
        <a>
          <span> Adicionar novo cliente </span>
        </a>
      </template>
      <template slot="empty">Sem resultados para {{ name }}</template>
    </b-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: this.client.name || '',
    };
  },
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filteredDataObj() {
      return this.clients.filter(option => option.name
        .toString()
        .toLowerCase()
        .indexOf(this.name.toLowerCase()) >= 0);
    },
    clients() {
      return this.$store.state.client.all;
    },
  },
  methods: {
    setClient(client) {
      this.$emit('set-client', client);
    },
  },
};
</script>
