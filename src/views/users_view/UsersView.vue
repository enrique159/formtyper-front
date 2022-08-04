<template>
  <div class="users-view animation-fade-left">
    <v-container>
      <h2>Usuarios</h2>
    </v-container>
    <v-container>
      <div class="d-flex justify-space-between align-center flex-wrap">
        <MyUserInfoComp />
        <v-btn class="d-sm-flex d-none" depressed color="primary" disabled v-if="user.usertype == 'admin'">
          <v-icon>mdi-plus</v-icon>
          Nuevo usuario
        </v-btn>
      </div>
      <div class="d-flex justify-center align-center d-flex d-sm-none mt-5">
        <v-btn depressed color="primary">
          <v-icon>mdi-plus</v-icon>
          Nuevo usuario
        </v-btn>
      </div>
    </v-container>
    <v-container>
      <UsersTableComp v-if="user.usertype == 'admin'" />
    </v-container>
  </div>
</template>

<script>
import MyUserInfoComp from '@/components/users_view/MyUserInfoComp.vue'
import UsersTableComp from '@/components/users_view/UsersTableComp.vue'
import { mapGetters } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'UsersView',
  metaInfo: { title: 'Usuarios' },
  components: {
    MyUserInfoComp,
    UsersTableComp
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  }
}
</script>

<style lang="scss" scoped>
.users-view{
  width: 100%;
  height: 100%;
}

.centered-div{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}
</style>