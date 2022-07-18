<template>
  <div class="home-view">
    <NavigationDrawerComp ref="NavigationDrawer" />
    <v-btn 
      @click="showNavigationDrawer()"
      outlined 
      absolute 
      icon 
      top 
      right 
      class="d-flex d-sm-none"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <router-view />
  </div>
</template>

<script>
import NavigationDrawerComp from '@/components/general/NavigationDrawerComp.vue';
import { logoutUser } from "@/auth/index";
import store from '@/store';
export default {
  name: 'Home',
  metaInfo: { title: 'Home' },
  data() {
    return {
      showNavigation: false
    }
  },
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
  methods: {
    showNavigationDrawer() {
      this.$refs.NavigationDrawer.show = !this.$refs.NavigationDrawer.show;
    },
  },
}
</script>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  max-height: calc(var(--vh, 1vh) * 100);
  background-color: var(--color-background);
  display: flex;
}
</style>