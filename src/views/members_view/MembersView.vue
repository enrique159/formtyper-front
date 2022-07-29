<template>
  <div class="member-view animation-fade-left">
    <v-container class="px-5 px-sm-3">
      <h2 class="mb-3 mb-sm-0">Miembros</h2>
      <div class="d-flex justify-space-between mb-4">
        <RouteDirectoryComp :items="items"/>
        <v-btn color="primary" @click="$router.push('/members/new')">
          <v-icon>mdi-plus</v-icon>
          Nuevo miembro
        </v-btn>
      </div>
    </v-container>
    <v-container>
      <MembersTableComp 
        ref="membersTable"
        :show="showEdit" 
        :updateRegister="updateRegister"
        v-on:updateShow="showEdit = $event" 
        v-on:updateRegister="updateRegister = $event"
      />
    </v-container>
    <MembersEditComp v-if="showEdit" :show="showEdit" :updateRegister="updateRegister" v-on:updateShow="showEdit = $event"/>
  </div>
</template>

<script>
import RouteDirectoryComp from '@/components/general/RouteDirectoryComp.vue'
import MembersTableComp from '@/components/members_view/MembersTableComp.vue'
import MembersEditComp from '@/components/members_view/MembersEditComp.vue'
export default {
  name: 'MembersView',
  metaInfo: { title: 'Miembros' },
  components: {
    RouteDirectoryComp,
    MembersTableComp,
    MembersEditComp
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
          name: 'Miembros',
          disabled: true,
          route: '/members',
        },
      ],
      updateRegister: {},
      showEdit: false,
    }
  },
  methods: {
    reloadMembers() {
      this.$refs.membersTable.getMembers();
    }
  }
}
</script>

<style lang="scss" scoped>
.member-view{
  height: 100%;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
}
</style>