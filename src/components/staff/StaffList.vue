<template>
  <Table :headers="headers" :data="data" />
</template>

<script>
import Table from '@/components/Table.vue';

export default {
  data() {
    return {
      headers: [
        {
          name: 'name',
          title: 'Nome',
        }, {
          name: 'email',
          title: 'Email',
        }, {
          name: 'phone',
          title: 'Telefone',
        },
      ],
    };
  },
  props: ['data'],
  components: {
    Table,
  },
};
</script>

<style lang="scss">
.table {
  width: 100%;
}
</style>
