<template>
  <div class="table">
    <div class="table-head">
      <div class="columns is-side-gapless">
        <div v-for="h in (headers || defaultHeaders)" :key="h.name" class="column">
          {{ h.title }}
        </div>
      </div>
    </div>
    <div class="table-body">
      <div class="columns is-side-gapless" v-for="d in data" :key="d.id">
        <div v-for="h in (headers || defaultHeaders)" :key="h.name" class="column">
          {{ d[h.name] }}
        </div>
      </div>
    </div>
  </div>
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
          name: 'name',
          value: 'Nelio Carneiro',
        },
        {
          name: 'email',
          value: 'nelio@agendei.io',
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
  margin-top: 20px;

  .is-side-gapless {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .table-head {

    .column {
      border-top: 1px solid #CCCCCC;
      border-left: 1px solid #CCCCCC;
      border-bottom: 1px solid #CCCCCC;
      border-right: 0;
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .column + .column {
      border-right: 1px solid #CCCCCC;
    }
  }

  .table-body {

    .column {
      border-top: 1px solid #CCCCCC;
      border-left: 1px solid #CCCCCC;
      border-bottom: 1px solid #CCCCCC;
      border-right: 0;
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .column + .column {
      border-right: 1px solid #CCCCCC;
    }
  }
}
</style>
