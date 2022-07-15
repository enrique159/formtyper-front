<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>

    <!-- SNACKBAR -->
    <v-snackbar
      v-model="getSnackbar.show"
      :timeout="getSnackbar.timeout"
    >
      {{ getSnackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="getSnackbar.color"
          text
          v-bind="attrs"
          @click="closeSnackbar()"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import store from '@/store'
export default {
  name: 'App',
  computed: {
    getSnackbar() {
      return store.getters.getSnackbar
    }
  },
  created() {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  },
  methods: {
    closeSnackbar() {
      store.dispatch('setSnackbar', { show: false, text: '', timeout: 4000, color: 'primary' })
    }
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');
@import '@/styles/general.scss';

.v-application {
  font-family: var(--general-font) !important;
}

.v-application--wrap {
  min-height: calc(var(--vh, 1vh) * 100) !important;
}

.v-list-item__icon > .v-icon {
    color: rgba(0, 0, 0, 0.8) !important;
}
</style>
