<template>
  <table class="table is-hoverable">
    <thead class="table-head">
      <tr>
        <th
          v-for="h in (headers || defaultHeaders)"
          :key="h.name"
        >
          {{ h.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d in defaultData" :key="d.id">
        <td v-for="h in (headers || defaultHeaders)" :key="h.name">
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
          name: 'email',
          title: 'Email',
        },
      ],
      defaultData: [
        {
          name: 'Nelio Carneiro',
          email: 'nelio@agendei.io',
        },
        {
          name: 'Nelio Carneiro',
          email: 'nelio@agendei.io',
        },
      ],
    };
  },
  props: {
    classes: String,
    headers: Array,
    data: Array,
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
