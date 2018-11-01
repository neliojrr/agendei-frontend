<template>
  <div>
    <Menu />
    <NavApp />
    <div class="staff app-content">
      <StaffList />
    </div>
  </div>
</template>

<script>
import StaffList from '../components/staff/StaffList.vue';
import Menu from '../components/Menu.vue';
import NavApp from '../components/NavApp.vue';

export default {
  data() {
    return {
      eu: '',
    };
  },
  components: {
    Menu,
    NavApp,
    StaffList,
  },
};
</script>
