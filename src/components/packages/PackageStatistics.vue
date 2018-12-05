<template>
  <div class="package-info">
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h2 class="title is-5">
            Estatísticas
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PackageForm from '@/components/packages/PackageForm.vue';

export default {
  data() {
    return {
      format: '24',
    };
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
        color: $info;
      }

      a:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

