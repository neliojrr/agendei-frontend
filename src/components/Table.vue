<template>
  <table
    class="table is-hoverable"
    :class="{ 'is-bordered': isBordered, 'is-striped': isStriped }"
  >
    <thead class="table-head">
      <tr>
        <th
          v-for="(h, index) in (headers || defaultHeaders)"
          :key="h.name"
          :class="{ 'is-hidden-mobile': index > mobileHidden }"
        >
          {{ h.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d in (data ? data : defaultData)" :key="d.id" @click="rowClick(d.id)">
        <td
          v-for="(h, index) in (headers || defaultHeaders)"
          :key="h.name"
          :class="{ 'is-hidden-mobile': index > mobileHidden }"
        >
          {{ d[h.name] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      defaultHeaders: [
        {
          name: 'name',
          title: 'Nome',
        },
        {
          name: 'phone',
          title: 'Telefone',
        },
        {
          name: 'email',
          title: 'Email',
        },
      ],
      defaultData: [
        {
          id: 1,
          name: 'Nelio Carneiro',
          phone: '123456789',
          email: 'nelio@agendei.io',
        },
        {
          id: 2,
          name: 'Natalia Rosa',
          phone: '64818928198',
          email: 'natalia@email.com',
        },
      ],
    };
  },
  props: {
    classes: String,
    headers: Array,
    data: Array,
    isBordered: Boolean,
    isStriped: Boolean,
    mobileHidden: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    rowClick(id) {
      this.$emit('row-click', id);
    },
  },
};
</script>


<style lang="scss">
.table {

  tbody {

    td {
      cursor: pointer;
    }
  }
}

</style>
