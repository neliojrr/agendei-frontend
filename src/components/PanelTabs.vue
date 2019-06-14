<template>
  <nav class="panel form-select-item">
    <div class="panel-block search-block">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="search">
        <span class="icon is-left">
          <font-awesome-icon icon="search" />
        </span>
      </p>
    </div>
    <transition :name="transitionName" mode="out-in">
      <div v-if="show">
        <a
          class="panel-block back-button"
          v-if="back"
          @click="goBack"
        >
          <span class="panel-icon">
            <font-awesome-icon icon="chevron-left" />
          </span>
          Voltar
        </a>
        <div v-if="items.length === 0" class="panel-block">
          <p class="is-centered">
            Não existem itens nesta seção
          </p>
        </div>
        <a
          class="panel-block"
          v-for="item in items"
          :key="item.id"
          @click="itemAction(item)"
        >
          <span class="panel-icon">
            <font-awesome-icon v-if="!!item.icon" :icon="item.icon" />
          </span>
          {{ item.title }}
          <span v-if="item.selectable" class="panel-icon to-right price">
            {{ displayMoney(item.price) }}
          </span>
          <span v-else class="panel-icon to-right">
            <font-awesome-icon icon="chevron-right" />
          </span>
        </a>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      transitionName: 'slide-in',
    };
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    back: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.show = true;
  },
  updated() {
    this.show = true;
  },
  methods: {
    goBack() {
      this.transitionName = 'slide-out';
      this.show = false;
      this.$emit('go-back');
    },

    itemAction(item) {
      if (item.selectable) {
        this.$emit('add-item', item);
      } else {
        this.transitionName = 'slide-in';
        this.show = false;
        item.action();
      }
    },
  },
};
</script>

<style lang="scss">
.form-select-item {
  .search-block {
    border: 0;
    margin-bottom: 20px;
  }

  a.panel-block:nth-of-type(1) {
    border-top: 1px solid #dbdbdb;
  }

  a.back-button {
    justify-content: center;
  }

  .to-right {
    margin-left: auto;
    width: 5em;
    margin-right: 0;
    text-align: right;
  }

  .is-centered {
    margin: auto;
    padding: 20px;
  }

  .slide-in-enter-active {
    transition: 0.5s;
    position: relative;
    right: 0;
  }

  .slide-in-leave-active {
    transition: 0.5s;
    position: relative;
    left: 0;
  }

  .slide-in-enter {
    position: relative;
    right: -100%;
  }

  .slide-in-leave-to {
    position: relative;
    left: -100%;
  }

  .slide-out-enter-active {
    transition: 0.5s;
    position: relative;
    left: 0;
  }

  .slide-out-leave-active {
    transition: 0.5s;
    position: relative;
    right: 0;
  }

  .slide-out-enter {
    position: relative;
    left: -100%;
  }

  .slide-out-leave-to {
    position: relative;
    right: -100%;
  }
}
</style>
