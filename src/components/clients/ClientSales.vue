<template>
  <div class="client-sales">
    <div class="card">
      <div class="card-content">
        <div>
          <figure class="image is-128x128">
            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
          </figure>
        </div>
        <div>
          <b-tag type="is-info">10 agendamentos</b-tag>
        </div>
        <div class="content">
          <p>Nelio Carneiro Junior</p>
          <p>nelio10@agendei.io</p>
          <p>+48 574 092 217</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
.client-sales {

  .card {

    .card-content {

      div {
        margin-bottom: 15px;
      }

      figure {
        margin: auto;
      }
    }

    .card-footer {

      a.new-appointment {
        color: $primary;
      }

      a.delete-client {
        color: $danger;
      }
    }
  }
}
</style>

