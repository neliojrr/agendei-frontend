<template>
  <div
    class="mobile-bottom-menu"
    :class="[{ 'is-hidden-desktop': isHiddenDesktop }, classes]"
  >
    <div
      v-if="showButtonOptions"
      class="mobile-action-background"
      @click="showButtonOptions = false"
    />
    <button
      class="button is-primary"
      v-show="!showButtonOptions"
      @click="showButtonOptions = true"
      >
      <span>
        <font-awesome-icon icon="plus" />
      </span>
    </button>
    <div
      v-show="showButtonOptions"
      class="mobile-buttons"
      v-for="button in buttons"
      :key="button.id"
    >
      <b-tooltip
        :label="button.title"
        position="is-left"
        type="is-black"
        :always="showButtonOptions"
      >
        <button class="button is-info" @click="buttonAction(button.action)">

          <span>
            <font-awesome-icon :icon="button.icon" />
          </span>
        </button>
      </b-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showButtonOptions: false,
    };
  },
  props: {
    buttons: {
      type: Array,
      required: true,
    },
    classes: {
      type: String,
      default: '',
    },
    isHiddenDesktop: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    buttonAction(action) {
      this.showButtonOptions = false;
      action();
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-bottom-menu {
  position: fixed;
  bottom: 21px;
  right: 25px;
  z-index: 100;

  button {
    height: 50px;
    width: 50px;
    padding: 0;
    display: flex;
    border-radius: 50%;
    z-index: 100;
    font-size: 18px;
  }

  .mobile-buttons {
    margin-bottom: 10px;
  }
}
.mobile-action-background {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: #000000;
  opacity: 0.4;
  z-index: 99;
}
</style>
