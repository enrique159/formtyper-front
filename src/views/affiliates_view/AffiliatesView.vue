<template>
  <div class="affiliates-view animation-fade-left">
    <v-container class="px-5 px-sm-3">
      <h2 class="mb-3 mb-sm-0">Afiliados</h2>
      <div class="d-flex justify-space-between mb-4">
        <RouteDirectoryComp :items="items"/>
        <v-btn color="primary" @click="$router.push('/affiliates/new')">
          <v-icon>mdi-plus</v-icon>
          Nuevo Afiliado
        </v-btn>
      </div>
    </v-container>
    <v-container>
      <AffiliatesTableComp 
        ref="affiliatesTable"
        :show="showEdit" 
        :updateRegister="updateRegister"
        v-on:updateShow="showEdit = $event" 
        v-on:updateRegister="updateRegister = $event"
      />
    </v-container>
    <AffiliatesEditComp v-if="showEdit" :show="showEdit" :updateRegister="updateRegister" v-on:updateShow="showEdit = $event"/>
  </div>
</template>

<script>
import AffiliatesTableComp from '@/components/affiliates_view/AffiliatesTableComp.vue'
import AffiliatesEditComp from '@/components/affiliates_view/AffiliatesEditComp.vue'
import RouteDirectoryComp from '@/components/general/RouteDirectoryComp.vue'
export default {
  name: 'AffiliatesView',
  metaInfo: { title: 'Afiliados' },
  components: {
    AffiliatesTableComp,
    RouteDirectoryComp,
    AffiliatesEditComp
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
      updateRegister: {},
      showEdit: false,
    }
  },
  methods: {
    reloadAffiliates() {
      this.$refs.affiliatesTable.getAffiliates();
    }
  },
}
</script>

<style lang="scss" scoped>
.affiliates-view{
  height: 100%;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
}
</style>