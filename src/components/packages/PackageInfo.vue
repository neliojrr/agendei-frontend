<template>
  <div class="package-info">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h2 class="title is-5">
            Informações
          </h2>
          <PackageForm :data="data" />
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item edit-client">Salvar</a>
        <a href="#" class="card-footer-item delete-client">Deletar</a>
      </footer>
    </div>
  </div>
</template>

<script>
import PackageForm from '@/components/packages/PackageForm.vue';

export default {
  data() {
    return { };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    PackageForm,
  },
};
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
.package-info {

  .card {

    .card-content {

      h2 {
        font-weight: normal;
      }

      div {
        margin-bottom: 15px;
      }
    }

    .card-footer {

      a.delete-client {
        color: $danger;
      }

      a.edit-client {
        color: $primary;
      }

      a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

