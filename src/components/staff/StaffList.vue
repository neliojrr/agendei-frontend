<template>
  <vuetable
    ref="stafftable"
    :api-mode="false"
    :fields="['name', 'email', 'phone']"
  >
  </vuetable>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable.vue';

export default {
  data() {
    return {
      salon: {},
    };
  },
  created() {
    this.salon = JSON.parse(window.sessionStorage.getItem('salon'));
    if (!this.salon.id) {
      this.$router.push('/login');
    }
  },
  components: {
    Vuetable,
  },
};
</script>
