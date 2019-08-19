<template>
  <aside class="menu is-hidden-mobile is-hidden-tablet-only">
    <p class="menu-label">
      Menu
    </p>
    <ul class="menu-list">
      <li v-for="item in items" class="navbar-item" v-bind:key="item.id">
        <router-link v-bind:to="item.path">
          <font-awesome-icon v-bind:icon="item.icon" />
          <span class="menu-title">{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import menuItems from '../utils/menuItems';

export default {
  data() {
    return {
      items: menuItems
    };
  }
};
</script>

<style lang="scss">
@import '../assets/sass/variables';

.menu {
  position: fixed;
  background-color: #333c44;
  height: 100vh;
  width: $side-menu-size;
  top: 0;

  .menu-label {
    margin-top: 20px;
  }

  .menu-list {
    li {
      text-align: left;

      a {
        width: 100%;
        font-size: 17px;
        color: white;

        svg {
          width: 15%;
        }

        span {
          margin-left: 10px;
        }
      }

      a:hover {
        color: #3273dc;
      }
    }
  }
}
</style>
