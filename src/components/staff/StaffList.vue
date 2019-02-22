<template>
  <Table :headers="headers" :data="data" @row-click="editEmployee" />
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
          name: 'phone',
          title: 'Telefone',
        }, {
          name: 'email',
          title: 'Email',
        },
      ],
    };
  },
  props: ['data'],
  components: {
    Table,
  },
  methods: {
    editEmployee(employee) {
      this.$emit('edit-employee', employee);
    },
  },
};
</script>

<style lang="scss">
.table {
  width: 100%;
}
</style>
