<template>
  <div class="home-view">
    <NavigationDrawerComp />
    <div class="mobile-space d-flex d-lg-none"></div>
    <router-view />
  </div>
</template>

<script>
import NavigationDrawerComp from '@/components/general/NavigationDrawerComp.vue';
import { logoutUser } from "@/auth/index";
import store from '@/store';
export default {
  name: 'Home',
  components: {
    NavigationDrawerComp,
  },
  created() {
    if(!store.getters.getRememberSesion) {
      window.addEventListener('beforeunload', () => {
        logoutUser();
      }, false)
    }
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', () => {
      logoutUser();
    }, false)
  },
}
</script>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  height: fit-content;
  min-height: calc(var(--vh, 1vh) * 100);
  background-color: var(--color-background);
  display: flex;
}
.mobile-space {
  width: 58px;
  height: calc(var(--vh, 1vh) * 100);
}
</style>