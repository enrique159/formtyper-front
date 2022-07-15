<template>
  <div class="affiliates-view animation-fade-left">
    <v-container>
      <h1>Afiliados</h1>
      <div class="d-flex justify-space-between mb-4">
        <RouteDirectoryComp :items="items"/>
        <v-btn color="primary" @click="$router.push('/affiliates/new')">
          <v-icon>mdi-plus</v-icon>
          Nuevo Afiliado
        </v-btn>
      </div>
      <!-- <AffiliatesTableComp /> -->
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="12" sm="4" class="pa-8">
          <div class="action-card">
            <h4>Exportar información</h4>
          </div>
        </v-col>
        <v-col cols="12" sm="4" class="pa-8">
          <div class="action-card">
            <h4>Exportar información</h4>
          </div>
        </v-col>
        <v-col cols="12" sm="4" class="pa-8">
          <div class="action-card">
            <h4>Exportar información</h4>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
//import AffiliatesTableComp from '../../components/affiliates_view/AffiliatesTableComp.vue'
import RouteDirectoryComp from '@/components/general/RouteDirectoryComp.vue'
export default {
  name: 'AffiliatesView',
  components: {
    //AffiliatesTableComp,
    RouteDirectoryComp
  },
  data() {
    return {
      items: [
        {
          name: 'Inicio',
          disabled: false,
          route: '/dashboard',
        },
        {
          name: 'Afiliados',
          disabled: true,
          route: '/affiliates',
        },
      ],
    }
  },
  methods: {
    //
  }
}
</script>

<style lang="scss" scoped>
.affiliates-view{
  height: 100%;
  width: 100%;
}

.action-card {
  width: 100%;
  height: fit-content;
  padding: 2rem;
  background-color: #ececec;
  border-radius: 1rem;
  text-align: center;
}
</style>