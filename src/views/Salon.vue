<template>
  <div>
    <Menu />
    <NavApp :title="pageTitle" />
    <div class="my-salon app-content"></div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex';
import { api } from '@/utils/api-connect';
import Menu from '../components/Menu.vue';
import NavApp from '../components/NavApp.vue';

export default {
  components: {
    Menu,
    NavApp
  },
  props: {
    pageTitle: {
      type: String,
      default: 'Meu salão'
    }
  }
};
</script>

<style lang="scss">
.my-salon {
}
</style>
