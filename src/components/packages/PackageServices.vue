<template>
  <div class="package-services">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h2 class="title is-5">
            Serviços
          </h2>
          <div class="columns is-multiline">
            <div class="column add-service-column is-half-desktop">
              <div class="field has-addons">
                <div class="control is-loading add-service-input">
                  <input class="input" type="text" placeholder="Digite o nome do serviço">
                </div>
                <div class="control">
                  <a class="button is-info">
                    Adicionar
                  </a>
                </div>
              </div>
            </div>
            <div class="column is-full">
              <Table :headers="headers" :data="tableData" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '@/components/Table.vue';

export default {
  data() {
    return {
      tableData: [],
      headers: [
        {
          name: 'name',
          title: 'Serviço',
        }, {
          name: 'quantity',
          title: 'Quantidade',
        }, {
          name: 'price',
          title: 'Preço',
        },
      ],
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    Table,
  },
};
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
.package-services {

  .card {

    .card-content {

      h2 {
        font-weight: normal;
      }

      div {
        margin-bottom: 15px;
      }

      .add-service-input {
        width: 100%;
      }

      .add-service-column {
        margin-top: 30px;
        margin-bottom: -30px;
      }
    }
  }
}
</style>

