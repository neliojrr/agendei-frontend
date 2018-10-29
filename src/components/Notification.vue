<template>
  <div v-if="open" class="top-notification notification" :class="type">
    <button @click="close" class="delete"></button>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: String,
    open: Boolean,
    type: String,
  },
  mounted() {
    setTimeout(this.close, 3000);
  },
  beforeUpdate() {
    setTimeout(this.close, 3000);
  },
  methods: {
    close() {
      this.$emit('close-notification');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top-notification {
  position: absolute;
  width: 70%;
  max-width: 70%;
  top: 10px;
  left: 15%;
  z-index: 999;
  font-weight: bold;
}
</style>

