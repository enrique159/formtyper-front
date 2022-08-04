<template>
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
      <v-btn text color="primary" style="margin-left: auto;">
        <v-icon>mdi-account-edit</v-icon>
        Editar
      </v-btn>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'MyUserInfoComp',
  computed: {
    user() {
      return store.getters.getUser
    }
  },
}
</script>

<style lang="scss" scoped>
.my-user-info-comp {
  width: 100%;
  height: fit-content;
  background-color: var(--color-white);
  box-shadow: var(--bs-light);
  border-radius: 1rem;
  padding: 0.6rem;

  @media screen and (min-width: 768px) {
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
</style>