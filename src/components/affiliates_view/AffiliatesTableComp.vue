<template>
  <div>
    <!-- DATA TABLE HEADER -->
    <div class="affiliates-table-extensions py-4">
      <v-row>
        <v-col cols="5" sm="3">
          <v-combobox
            v-model="sort"
            :items="sortOptions"
            label="Ordenar por"
            outlined
            dense
            hide-details
          ></v-combobox>
        </v-col>
        <v-col cols="2" sm="6">
          <v-btn
            @click="changeOrder"
            rounded
            color="primary"
            outlined
            fab
            small
          >
            <v-icon v-if="order === 'desc'">mdi-arrow-down</v-icon>
            <v-icon v-else>mdi-arrow-up</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="5" sm="3">
          <v-text-field
            v-model.lazy="search"
            label="Buscar"
            outlined
            dense
            hide-details
            @keyup="startTimerSearch()"
            @keydown="stopTimerSearch()"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <!-- ***************** DATA TABLE ***************** -->
    <v-data-table
      :headers="getHeaders"
      :items="items"
      :items-per-page="limit"
      :loading="loading"
      class="affiliates-table my-4"
      hide-default-footer
      mobile-breakpoint="0"
      disable-sort
    >
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ getDateFormatTimezone(item.createdAt) }}
      </template>
      <template v-slot:[`item.updatedAt`]="{ item }">
        {{ getDateFormatTimezone(item.updatedAt) }}
      </template>
    </v-data-table>

    <!-- DATA TABLE FOOTER -->
    <div class="affiliates-table-extensions">
      <div style="width: 100%; max-width: 160px;">
        <v-combobox
          v-model="limit"
          :items="[5, 10, 25]"
          label="Limite por página"
          outlined
          dense
          hide-details
        ></v-combobox>
      </div>
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="5"
        circle
        class="affiliates-table-pagination"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { CompactAffiliatesHeader, FullAffiliatesHeader, AffiliatesSortOptions } from '@/constants/AffiliatesHeadersDataTable'
import AffiliatesServices from '@/services/AffiliatesServices'
import moment from 'moment'
export default {
  name: 'AffiliatesTableComp',
  data() {
    return {
      typeHeaders: 'Compacto',
      tableFormats : [ 'Compacto', 'Detallado' ],
      search: '',
      headersCompact: CompactAffiliatesHeader,
      headersFull: FullAffiliatesHeader,
      page: 1,
      limit: 10,
      totalItems: 0,
      totalPages: 0,
      sortOptions: AffiliatesSortOptions,
      sort: { text: 'Fecha de creación', value: 'createdAt' },
      order: 'desc',
      items: [],

      errorText: '',
      snackbar: false,
      loading: false,
      typingTimer: null,
      doneTypingInterval: 1000,
    }
  },
  watch: {
    limit() {
      this.getAffiliates()
    },
    page() {
      this.getAffiliates()
    },
    sort() {
      this.getAffiliates()
    },
  },
  created() {
    this.getAffiliates();
  },
  computed: {
    getHeaders() {
      if(this.typeHeaders === 'Compacto') {
        return this.headersCompact;
      } else if(this.typeHeaders === 'Detallado') {
        return this.headersFull;
      }
    }
  },
  methods: {
    // METODO PARA CAMBIAR ORDER
    changeOrder() {
      if(this.order === 'desc') {
        this.order = 'asc';
      } else {
        this.order = 'desc';
      }
      this.getAffiliates();
    },
    
    // LLAMADA A API GET AFILIADOS
    async getAffiliates() {
      this.loading = true;
      const response = await AffiliatesServices.getAffiliates(
        {
          page: this.page, 
          limit: this.limit, 
          sort: this.sort.value,
          search: this.search, 
          order: this.order
        });
      if(response) {
        if(response.status === 200) {
          this.items = response.data.affiliates;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        } else {
          this.showSnackbar('Ocurrio un error inesperado', 'red')
        }
      } else this.showSnackbar('No es posible conectar al servidor', 'red')
      this.loading = false;
    },

    // SHOW SNACKBAR
    showSnackbar(text, color) {
      store.dispatch('setSnackbar', { show: true, text: text, color: color, timeout: 4000,})
    },


    // METODO PARA TRANSFORMAR LA FECHA A FORMATO DE TZ
    getDateFormatTimezone(date) {
      const dateTimezone = moment(date).subtract(6, 'hours');
      return dateTimezone.format('DD/MM/YYYY HH:mm:ss');
    },


    // METODOS PARA CREAR TIMER DE BUSQUEDA
    // Cuando el usuario escribe en el input de Buscar se crea un timer que se ejecuta cada 1 segundo
    // y con ello se ejecuta la llamada a la API con el campo de Search y el contenido escrito.

    // La idea es que si el usuario escribe una letra en el input de Buscar, se ejecuta la llamada a la API
    // pero no de forma inmediata para evitar llamadas a la API cada que se presiona una tecla
    startTimerSearch() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.getAffiliates, this.doneTypingInterval);
    },

    stopTimerSearch() {
      clearTimeout(this.typingTimer);
    }
  }
}
</script>

<style lang="scss" scoped>
.affiliates-table {
  padding: 8px 16px;
  border-radius: 1rem;
  box-shadow: var(--bs-normal);
}

.affiliates-table-extensions {
  padding: 8px 16px;
  border-radius: 1rem;
  background-color: var(--color-white);
  box-shadow: var(--bs-normal);
  display: flex;
  justify-content: space-between;
}
</style>