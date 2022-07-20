<template>
  <div class="dashboard animation-fade-left">
    <v-container class="px-8 px-sm-3">
      <h1>Bienvenido {{ user.name }}</h1>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardView',
  metaInfo: { title: 'Inicio' },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
}
</script>

<style lang="scss" scoped>
.dashboard{
  height: 100%;
  width: 100%;
}
</style>