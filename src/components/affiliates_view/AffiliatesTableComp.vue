<template>
  <div>
    <!-- DATA TABLE HEADER -->
    <div class="affiliates-table-extensions flex-column py-4">
      <v-row>
        <v-col cols="5" sm="3">
          <v-select
            v-model="sort"
            :items="sortOptions"
            label="Ordenar por"
            outlined
            dense
            hide-details
          ></v-select>
        </v-col>
        <v-col cols="2" sm="6" class="pt-4">
          <v-btn
            @click="changeOrder"
            rounded
            color="primary"
            outlined
            small
            icon
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
      @click:row="handleClick"
      class="affiliates-table my-4"
      hide-default-footer
      mobile-breakpoint="0"
    >
      <template v-slot:[`item.fullname`]="{ item }">
        <span class="one-line">{{ item.name }} {{ item.fatherSurname }} {{ item.motherSurname }}</span>
      </template>
      <template v-slot:[`item.street`]="{ item }">
        <span class="one-line">{{ item.street }} #{{ item.extnum }} / {{ item.intnum }}</span>
      </template>
      <template v-slot:[`item.neighborhood`]="{ item }">
        <span class="one-line">{{ item.neighborhood }}</span>
      </template>
      <template v-slot:[`item.birthdate`]="{ item }">
        <span class="one-line">{{ getDateFormatTimezone(item.birthdate) }}</span>
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        <span class="one-line">{{ getDateTimeFormatTimezone(item.createdAt) }}</span>
      </template>
      <template v-slot:[`item.updatedAt`]="{ item }">
        <span class="one-line">{{ getDateTimeFormatTimezone(item.updatedAt) }}</span>
      </template>
    </v-data-table>

    <!-- DATA TABLE FOOTER -->
    <div class="affiliates-table-extensions">
      <div style="width: 100%; max-width: 160px;">
        <v-select
          v-model="limit"
          :items="[5, 10, 25]"
          label="Limite por página"
          outlined
          dense
          hide-details
        ></v-select>
      </div>
      <v-btn-toggle
        v-model="typeHeaders"
        tile
        dense
        color="primary accent-3"
        group
      >
        <v-btn class="br-small" value="Compacto">
          Compacto
        </v-btn>
        <v-btn class="br-small" value="Direccion">
          Dirección
        </v-btn>
        <v-btn class="br-small" value="Detallado">
          Detallado
        </v-btn>
      </v-btn-toggle>
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="5"
        circle
        class="affiliates-table-pagination"
      ></v-pagination>
    </div>

    <v-container class="pa-0" v-show="!loading">
      <v-row>
        <!-- <v-col cols="12" sm="6" class="py-8">
          <div class="action-card">
            <v-select
              v-model="timeOption"
              :items="dateTimeOptions"
              label="Periodo de tiempo"
              outlined
              dense
              hide-details
            ></v-select>
            <apexchart type="bar" :options="options" :series="series"></apexchart>
          </div>
        </v-col> -->
        <v-col cols="12" sm="6" class="py-8">
          <div class="action-card">
            <v-row>
              <v-col cols="8">
                <h4>Exportar los registros a hoja de cálculo</h4>
                <p class="ts-small ma-0">Exporta los registros de la tabla a una hoja de cálculo de Excel.</p>
              </v-col>
              <v-col cols="4">
                <v-btn color="#123123" @click="generateExcel()">
                  <span class="tc-white">Exportar</span>
                  <v-icon color="green darken-2 pl-6"> mdi-table-arrow-right </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { CompactAffiliatesHeader, AddressAffiliatesHeader, FullAffiliatesHeader } from '@/constants/headers/AffiliatesHeadersDataTable'
import AffiliatesServices from '@/services/AffiliatesServices'
import { AffiliatesSortOptions, AffiliatesPeriodOptions, PeriodOptions } from '@/constants/AffiliatesSortOptions'
import { errorGetAffiliates } from '@/utils/errors/errorGetAffiliates'
import { showSnackbar } from '@/utils/showSnackbar'
import * as XLSX from "xlsx";
import moment from 'moment'
export default {
  name: 'AffiliatesTableComp',
  props: {
    updateRegister: {
      type: Object,
      default: () => ({})
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      typeHeaders: 'Compacto',
      tableFormats : [ 'Compacto', 'Detallado' ],
      search: '',
      headersCompact: CompactAffiliatesHeader,
      headersFull: FullAffiliatesHeader,
      headersAddress: AddressAffiliatesHeader,
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

      // Apexchart
      timeOption: "last7Days",
      dateTimeOptions: AffiliatesPeriodOptions,
      options: {
        chart: {
          id: 'chart-registros-periodo'
        },
        xaxis: {
          categories: this.getCategoriesByTimeOption
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
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
    timeOption() {
      this.getAffiliatesCount()
    }
  },
  created() {
    this.getAffiliates();
    //this.getAffiliatesCount();
  },
  computed: {
    getHeaders() {
      if(this.typeHeaders === 'Compacto') {
        return this.headersCompact;
      } else if(this.typeHeaders === 'Detallado') {
        return this.headersFull;
      } else if(this.typeHeaders === 'Direccion') {
        return this.headersAddress;
      } else return this.headersCompact;
    },
    showProp: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit('updateShow', value);
      },
    },
    updateRegisterProp: {
      get() {
        return this.updateRegister;
      },
      set(value) {
        this.$emit('updateRegister', value);
      },
    },
    getTimeFromTimeOption() {
      if (this.timeOption === PeriodOptions.SEVEN_DAYS) return moment().subtract(7, 'days').format('YYYY-MM-DD');
      if (this.timeOption === PeriodOptions.FIFTEEN_DAYS) return moment().subtract(15, 'days').format('YYYY-MM-DD');
      if (this.timeOption === PeriodOptions.ONE_MONTH) return moment().subtract(1, 'months').format('YYYY-MM-DD');
      if (this.timeOption === PeriodOptions.THREE_MONTHS) return moment().subtract(3, 'months').format('YYYY-MM-DD');
      if (this.timeOption === PeriodOptions.SIX_MONTHS) return moment().subtract(6, 'months').format('YYYY-MM-DD');
      if (this.timeOption === PeriodOptions.ONE_YEAR) return moment().subtract(1, 'years').format('YYYY-MM-DD');
      return moment().subtract(7, 'days').format('YYYY-MM-DD');
    },
    getCategoriesByTimeOption() {
      if (this.timeOption === PeriodOptions.SEVEN_DAYS) return ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
      if (this.timeOption === PeriodOptions.FIFTEEN_DAYS) return ['Semana 1', 'Semana 2', 'Semana 3'];
      if (this.timeOption === PeriodOptions.ONE_MONTH) return ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
      if (this.timeOption === PeriodOptions.THREE_MONTHS) return ['Mes 1', 'Mes 2', 'Mes 3'];
      if (this.timeOption === PeriodOptions.SIX_MONTHS) return ['Semestre 1', 'Semestre 2'];
      if (this.timeOption === PeriodOptions.ONE_YEAR) return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto'];
      return ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
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
          this.items = response.data.data;
          this.totalItems = response.data.totalItems;
          this.totalPages = response.data.totalPages;
        } else {
          errorGetAffiliates(response.data);
        }
      } else showSnackbar('No es posible conectar al servidor', 'red')
      this.loading = false;
    },

    // METODO PARA ABRIR Y EDITAR AFILIADO
    handleClick(item) {
      this.updateRegisterProp = item;
      this.showProp = true;
    },

    // METODO PARA TRANSFORMAR LA FECHA A FORMATO DE TZ
    getDateTimeFormatTimezone(date) {
      const dateTimezone = moment(date);
      return dateTimezone.format('DD/MM/YYYY HH:mm:ss');
    },

    getDateFormatTimezone(date) {
      if(date) {
        const dateSplit = date.split('T')[0];
        const formatDate = dateSplit.split('-');
        return `${formatDate[2]}/${formatDate[1]}/${formatDate[0]}`;
      } else return ""
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
    },

    // Get Affiliates Count
    async getAffiliatesCount() {
      const endDateTime = moment().format('YYYY-MM-DDThh:mm:ss+00:00');
      const response = await AffiliatesServices.getAffiliatesCount(this.getTimeFromTimeOption, endDateTime);
      if(response) {
        if(response.status === 200) {
          console.log(response.data);
        } else {
          errorGetAffiliates(response.data);
        }
      } else showSnackbar('No es posible conectar al servidor', 'red')
    },

    // GENERAR EXPORTACION DE EXCEL
    generateExcel() {
      const data = this.items;
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Afiliados");
      XLSX.writeFile(wb, "Afiliados.xlsx");
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

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
  }
}

.action-card {
  width: 100%;
  height: fit-content;
  padding: 2rem;
  background-color: #ececec;
  border-radius: 1rem;
}
</style>