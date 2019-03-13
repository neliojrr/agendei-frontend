<template>
  <div class="client-info">
    <div class="card">
      <div class="card-content">
        <div>
          <figure class="image is-128x128">
            <img class="is-rounded" :src="client.avatar.path">
          </figure>
        </div>
        <div>
          <b-tag type="is-info">
            {{ client.bookings ? client.bookings.length : 0 }} agendamentos
          </b-tag>
        </div>
        <div class="content">
          <p>{{ client.name }}</p>
          <p>{{ client.email }}</p>
          <p>{{ client.phone }}</p>
        </div>
      </div>
      <footer class="card-footer">
        <button
          type="button"
          href="#"
          class="button is-text card-footer-item new-appointment"
        >
          Agendamento
        </button>
        <button
          type="button"
          @click="$emit('edit-client')"
          class="button is-text card-footer-item edit-client"
        >
          Editar
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      format: '24',
    };
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
.client-info {

  .card {

    .card-content {

      div {
        margin-bottom: 15px;
      }

      figure {
        margin: auto;

        img {
          height: 128px;
          width: 128px;
        }
      }
    }

    .card-footer {

      button {
        height: 98%;
        text-decoration: none;
        border-radius: 0;
      }

      button.new-appointment {
        color: $primary;
      }

      button.edit-client {
        color: $info;
      }

      button:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

