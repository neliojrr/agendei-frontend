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
        <th v-if="actions.length > 0">&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d in (data ? data : defaultData)" :key="d.id" @click="rowClick(d)">
        <td
          v-for="(h, index) in (headers || defaultHeaders)"
          :key="h.name"
          :class="{ 'is-hidden-mobile': index > mobileHidden }"
        >
          {{ h.format ? h.format(d[h.name]) : d[h.name] }}
        </td>
        <td v-if="actions.length > 0" class="table-actions">
          <span v-for="action in (actions)" :key="action.title">
            <button
              class="action"
              :title="action.title"
              @click="action.toDo"
              :style="{ color: action.color }"
            >
              <font-awesome-icon v-if="action.type === 'icon'" :icon="action.icon" />
              <span v-if="action.type === 'text'">{{ action.title }}</span>
            </button>
          </span>
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
      actions: [],
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
    rowClick(obj) {
      this.$emit('row-click', obj);
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

  .table-actions {

    span {

      button {
        background: none;
        border: 0;
        cursor: pointer;

        svg {
          font-size: 18px;
        }
      }
    }

    span + span {
      margin-left: 10px;
    }
  }
}

</style>
