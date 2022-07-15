<template>
  <v-navigation-drawer :permanent="desktop" v-model="show" mini-variant-width="58" expand-on-hover width="240" absolute>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="@/assets/img/profile_image.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-content class="py-0" style="height: fit-content !important;">
          <v-list-item-title class="ts-normal">{{ getUser.name }} {{ getUser.lastname}}</v-list-item-title>
          <v-list-item-subtitle>{{ getUser.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item @click="openView('dashboard')">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Inicio</v-list-item-title>
      </v-list-item>
      <v-list-item @click="openView('affiliates')">
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Afiliados</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Asociados</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-chart-donut-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Reportes</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Usuarios</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-google-analytics</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Estadisticas</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Configuración</v-list-item-title>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pb-4">
        <v-list nav dense>
          <v-list-item link @click="logoutUser()">
            <v-list-item-icon>
              <v-icon>mdi-location-exit</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import store from '@/store';
import { logoutUser } from '@/auth/index';
export default {
  name: "NavigationDrawerComp",
  data() {
    return {
      desktop: true,
      show: true,
    }
  },
  computed: {
    getUser() {
      return store.getters.getUser ? store.getters.getUser : { name: '', lastname: '', email: '' }
    }
  },
  created() {
    window.addEventListener('resize', this.updateWindowWidth);
  },
  methods: {
    openView(route) {
      this.$router.push(`/${route}`);
    },

    logoutUser() {
      logoutUser();
      this.$router.push("/login");
    },

    updateWindowWidth() {
      this.desktop = window.innerWidth > 586;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  height: calc(var(--vh, 1vh) * 100) !important;
}

.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
    margin-right: 0px;
}

.v-application--is-ltr .v-list-item__avatar:first-child {
    margin-right: 0px;
}
</style>