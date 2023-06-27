<template>
  <div class="users-view animation-fade-left">
    <v-container>
      <h2>Usuarios</h2>
    </v-container>
    <v-container>
      <div class="d-flex justify-space-between align-center flex-wrap">
        <div class="my-user-info-comp">
          <div class="profile-user">
            <img :src="require(`@/assets/profile/profile_${user.image ?? 1}.png`)"/>
            <div>
              <div class="d-flex align-center">
                <h4 class="ts-text-light mb-0">{{ user.name }} {{ user.lastname}}</h4>
                <div class="chip-usertype ml-2" :class="user.usertype == 'admin' ? 'chip-admin' : 'chip-editor'">
                  <span class="tc-white ts-smallest tw-bold">{{ user.usertype }}</span>
                </div>
              </div>
              <p class="tw-regular ts-small tc-text-light mb-0">{{ user.email }}</p>
            </div>
            <v-btn text color="primary" style="margin-left: auto;" @click="editMyUser()">
              <v-icon>mdi-account-edit</v-icon>
              Editar
            </v-btn>
          </div>
        </div>
        <v-btn class="d-sm-flex d-none" depressed color="primary" v-if="user.usertype == 'admin'" @click="$router.push('/users/new')">
          <v-icon>mdi-plus</v-icon>
          Nuevo usuario
        </v-btn>
        <v-btn class="d-sm-none d-flex" fab small color="primary" v-if="user.usertype == 'admin'" @click="$router.push('/users/new')">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-container>
      <UsersTableComp 
        v-if="user.usertype == 'admin'" 
        ref="usersTable"
        :show="showEdit" 
        :updateRegister="updateRegister"
        v-on:updateShow="showEdit = $event" 
        v-on:updateRegister="updateRegister = $event"
      />
    </v-container>

    <UserEditComp v-if="showEdit" :show="showEdit" :updateRegister="updateRegister" v-on:updateShow="showEdit = $event"/>
  </div>
</template>

<script>
import UsersTableComp from '@/components/users_view/UsersTableComp.vue'
import UserEditComp from '@/components/users_view/UserEditComp.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'UsersView',
  metaInfo: { title: 'Usuarios' },
  components: {
    UsersTableComp,
    UserEditComp
},
  data() {
    return {
      updateRegister: {},
      showEdit: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    reloadMethods() {
      this.$refs.usersTable.getUsers();
    },

    editMyUser() {
      this.updateRegister = this.user;
      this.showEdit = true;
    }
  },
}
</script>

<style lang="scss" scoped>
.users-view{
  width: 100%;
  height: 100%;

  .my-user-info-comp {
    width: 80%;
    height: fit-content;
    background-color: var(--color-white);
    box-shadow: var(--bs-light);
    border-radius: 1rem;
    padding: 0.6rem;

    @media screen and (min-width: 600px) {
      width: 100%;
      max-width: 360px;
    }

    .profile-user {
      width: 100%;
      height: fit-content;
      display: flex;
      align-items: center;
      column-gap: 0.6rem;
      img { width: 100%; max-width: 48px;}
    }

    .chip-usertype{
      width: fit-content;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 6px 0px;
      border-radius: 10px;
    }

    .chip-admin {
      background-color: var(--color-orange);
    }
    .chip-editor {
      background-color: var(--color-blue);
    }
  }
}

.centered-div{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}
</style>