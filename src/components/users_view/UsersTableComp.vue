<template>
  <div>
    <!-- ***************** DATA TABLE ***************** -->
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      @click:row="handleClick"
      class="users-table my-4"
      mobile-breakpoint="0"
    >
      <template v-slot:[`item.image`]="{ item }">
        <v-img width="28" :src="require(`@/assets/profile/profile_${item.image || 1}.png`)"></v-img>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <span class="one-line">{{ item.name }} {{ item.lastname }}</span>
      </template>
      <template v-slot:[`item.usertype`]="{ item }">
        <v-chip :color="item.usertype == 'admin' ? 'orange' : 'blue'" small><span class="tc-white tw-medium">{{ item.usertype }}</span></v-chip>
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        <span class="one-line">{{ getDateTimeFormatTimezone(item.createdAt) }}</span>
      </template>
      <template v-slot:[`item.updatedAt`]="{ item }">
        <span class="one-line">{{ getDateTimeFormatTimezone(item.updatedAt) }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { UsersHeader } from '@/constants/headers/UsersHeadersDataTable'
import { showSnackbar } from '@/utils/showSnackbar';
import { errorGetUsers } from '@/utils/errors/errorGetUsers';
import UserServices from '@/services/UserServices';
import moment from 'moment';
export default {
  name: 'UsersTableComp',
  data() {
    return {
      headers: UsersHeader,
      items: [],
      loading: false,
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    handleClick(item) {
      console.log(item) 
    },

    async getUsers() {
      this.loading = true
      const response = await UserServices.getUsers()
      if(response) {
        if(response.status === 200) this.items = response.data;
        else errorGetUsers(response.data);
      } else showSnackbar('No es posible conectar al servidor', 'red')
      this.loading = false;
    },

    // METODO PARA TRANSFORMAR LA FECHA A FORMATO DE TZ
    getDateTimeFormatTimezone(date) {
      const dateTimezone = moment(date);
      return dateTimezone.format('DD/MM/YYYY HH:mm:ss');
    },
  },
}
</script>

<style lang="scss" scoped>
.users-table {
  padding: 8px 16px;
  border-radius: 1rem;
  box-shadow: var(--bs-normal);
}
</style>