<template>
  <div class="affiliates-create-view animation-fade-left">
    <v-container class="px-8 px-sm-3">
      <h1 class="mb-3 mb-sm-0">Crear nuevo registro</h1>
      <div class="d-flex justify-space-between align-center">
        <RouteDirectoryComp :items="routeItems" />
        <v-btn color="light" icon depressed @click="reset()">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-container class="px-8 px-sm-3">
      <v-form ref="formNewAffiliate" v-model="validForm" lazy-validation>
        <v-row class="mb-8">
          <v-col cols="12" sm="4">
            <v-divider class="mb-3"></v-divider>
            <h4>Información del registro</h4>
            <p class="ts-small tc-text-light">Llenar los campos relacionados al registro</p>
          </v-col>

          <v-col cols="12" sm="8">
            <v-row>
              <!-- CLAVE DE ELECTOR / CURP -->
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="register.electoralKeyCurp"
                  label="Clave de Elector / CURP"
                  :counter="18"
                  :rules="[rules.required, rules.minLengthElector]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- FECHA DE REGISTRO -->
              <v-col cols="6" sm="3" class="pb-0">
                <v-menu
                  ref="menuFechaRegistro"
                  v-model="menuFechaRegistro"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="computedDateFormatted"
                      label="Fecha de registro"
                      :rules="[rules.required]"
                      readonly
                      required
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="register.dateRegister"
                    @input="menuFechaRegistro = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <!-- Tipo de registro -->
              <v-col cols="6" sm="3" class="pb-0">
                <v-select
                  v-model="register.typeRegister"
                  label="Tipo de registro"
                  :items="['Afiliación', 'Ratificación']"
                  dense
                  outlined
                ></v-select>
              </v-col>

              <!-- DISTRITO FEDERAL -->
              <v-col cols="6" sm="3" class="pb-0">
                <v-text-field
                  v-model="register.federalDistrict"
                  label="Distrito Federal"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- SECCION ELECTORAL -->
              <v-col cols="6" sm="3" class="pb-0">
                <v-text-field
                  v-model="register.electoralSection"
                  label="Sección Electoral"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

            </v-row>
          </v-col>
        </v-row>

        <!-- ///////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////// INFORMACION PERSONAL DEL REGISTRO /////////////////////// -->

        <v-row class="mb-8">
          <v-col cols="12" sm="4">
            <v-divider class="mb-3"></v-divider>
            <h4>Información personal</h4>
            <p class="ts-small tc-text-light">Llenar los campos relacionados a la persona</p>
          </v-col>

          <v-col cols="12" sm="8">
            <v-row>
              <!-- NOMBRE -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="register.name"
                  label="Nombre"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- APELLIDO PATERNO -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="register.fatherSurname"
                  label="Apellido paterno"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- APELLIDO MATERNO -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="register.motherSurname"
                  label="Apellido materno"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- CALLE -->
              <v-col cols="12" sm="8" class="pb-0">
                <v-text-field
                  v-model="register.street"
                  label="Calle"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- NO.EXT -->
              <v-col cols="6" sm="2" class="pb-0">
                <v-text-field
                  v-model="register.extnum"
                  label="No. Ext"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- NO.INT -->
              <v-col cols="6" sm="2" class="pb-0">
                <v-text-field
                  v-model="register.intnum"
                  label="No. Int"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- COLONIA -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="register.neighborhood"
                  label="Colonia"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- CIUDAD -->
              <v-col cols="12" sm="3" class="pb-0">
                <v-text-field
                  v-model="register.city"
                  label="CIUDAD"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- MUNICIPIO -->
              <v-col cols="6" sm="3" class="pb-0">
                <v-text-field
                  v-model="register.township"
                  label="Municipio"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- CP -->
              <v-col cols="6" sm="2" class="pb-0">
                <v-text-field
                  v-model="register.cp"
                  label="C.P."
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

            </v-row>
          </v-col>
        </v-row>

        <!-- ///////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////
        ////////////////////// INFORMACION DE CONTACTO ///////////////////////////////// -->

        <v-row>
          <v-col cols="12" sm="4">
            <v-divider class="mb-3"></v-divider>
            <h4>Información de contacto</h4>
            <p class="ts-small tc-text-light">Llena los campos de contacto de la persona</p>
          </v-col>

          <v-col cols="12" sm="8">
            <v-row>
              <!-- TELEFONO CELULAR -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="register.cellPhoneNumber"
                  label="Teléfono celular"
                  prepend-inner-icon="mdi-phone"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- TELEFONO CASA -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="register.phoneNumber"
                  label="Teléfono de casa"
                  prepend-inner-icon="mdi-phone-classic"
                  :rules="[]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- EMAIL -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="register.email"
                  label="Correo electrónico"
                  prepend-inner-icon="mdi-email"
                  :rules="[rules.email]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>  

        <div class="d-flex justify-end">
          <v-btn
            color="info"
            depressed
            class="mr-4"
            @click="createFakeAffiliate()"
          >
            Crear registro aleatorio
          </v-btn>
          <v-btn
            :disabled="loading"
            color="light"
            depressed
            class="mr-4"
            @click="cancel()"
          >
            Cancelar
          </v-btn>

          <v-btn
            :disabled="!validForm || loading"
            :loading="loading"
            color="primary"
            @click="validate"
          >
            Registrar
          </v-btn>
        </div>

      </v-form>
    </v-container>
  </div>
</template>

<script>
import RouteDirectoryComp from "@/components/general/RouteDirectoryComp.vue";
import { createFakeAffiliateRegister } from "@/common/createMockData";
import AffiliatesServices from '@/services/AffiliatesServices';
import store from '@/store'
export default {
  name: "AffiliatesCreateView",
  metaInfo: { title: "Nuevo Afiliado" },
  components: {
    RouteDirectoryComp,
  },
  data() {
    return {
      menuFechaRegistro: false,
      validForm: false,
      loading: false,
      routeItems: [
        { name: "Inicio", disabled: false, route: "/dashboard" },
        { name: "Afiliados", disabled: false, route: "/affiliates" },
        { name: "Nuevo Afiliado", disabled: true, route: "/newaffiliate" },
      ],
      rules: {
        required: (v) => !!v || "Este campo es requerido",
        minLength: (v) => (v && v.length >= 10) || "Debe contener al menos 10 caracteres",
        minLengthElector: (v) => (v && v.length == 18) || "Debe contener exactamente 18 caracteres",
        email: (v) => (/.+@.+\..+/.test(v) || v == '') || "Email no válido",
      },

      register: {
        typeRegister: "Afiliación",
        dateRegister: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        name: "",
        fatherSurname: "",
        motherSurname: "",
        street: "",
        extnum: "",
        intnum: "",
        neighborhood: "",
        city: "",
        township: "",
        cp: "",
        federalDistrict: "",
        electoralSection: "",
        email: "",
        phoneNumber: "",
        cellPhoneNumber: "",
        electoralKeyCurp: "",
        signed: true,
      }
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.register.dateRegister);
    },
  },
  methods: {
    async validate() {
      await this.$refs.formNewAffiliate.validate();
      if(!!this.validForm) {
        this.createAffiliate();
      }
    },

    cancel() {
      this.$router.push("/affiliates");
    },

    async createAffiliate() {
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(2000);
      const response = await AffiliatesServices.createAffiliate(this.register)
      if(response) {
        if(response.status === 200) {
          this.showSnackbar('Registro creado con éxito', 'success');
          this.reset();
        } else {
          if (response.status == 401) this.showSnackbar('Usuario no válido para realizar esta operación', 'red');
          else this.showSnackbar('Ocurrió un error en el servidor', 'red');
        }
      } else this.showSnackbar('No hay conexión con el servidor', 'red');
      this.loading = false;
    },

    reset() {
      this.$refs.formNewAffiliate.resetValidation()
      this.setStartValues()
    },

    setStartValues() {
      this.register.dateRegister = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);
      this.register.typeRegister = "Afiliación";
      this.register.name = "";
      this.register.fatherSurname = "";
      this.register.motherSurname = "";
      this.register.street = "";
      this.register.extnum = "";
      this.register.intnum = "";
      this.register.neighborhood = "";
      this.register.city = "";
      this.register.township = "";
      this.register.cp = "";
      this.register.federalDistrict = "";
      this.register.electoralSection = "";
      this.register.email = "";
      this.register.phoneNumber = "";
      this.register.cellPhoneNumber = "";
      this.register.electoralKeyCurp = "";
      this.register.signed = true;
    },

    async createFakeAffiliate() {
      const fakeAffiliate = await createFakeAffiliateRegister();
      this.register.dateRegister = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);
      this.register.typeRegister = "Afiliación";
      this.register.name = fakeAffiliate.name;
      this.register.fatherSurname = fakeAffiliate.fatherSurname;
      this.register.motherSurname = fakeAffiliate.motherSurname;
      this.register.street = fakeAffiliate.street;
      this.register.extnum = fakeAffiliate.extnum;
      this.register.intnum = fakeAffiliate.intnum;
      this.register.neighborhood = fakeAffiliate.neighborhood;
      this.register.city = fakeAffiliate.city;
      this.register.township = fakeAffiliate.township;
      this.register.cp = fakeAffiliate.cp;
      this.register.federalDistrict = fakeAffiliate.federalDistrict;
      this.register.electoralSection = fakeAffiliate.electoralSection;
      this.register.email = fakeAffiliate.email;
      this.register.phoneNumber = fakeAffiliate.phoneNumber;
      this.register.cellPhoneNumber = fakeAffiliate.cellPhoneNumber;
      this.register.electoralKeyCurp = fakeAffiliate.electoralKeyCurp;
      this.register.signed = true;
    },

    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    // SHOW SNACKBAR
    showSnackbar(text, color) {
      store.dispatch('setSnackbar', { show: true, text: text, color: color, timeout: 4000,})
    },
  },
};
</script>

<style lang="scss" scoped>
.affiliates-create-view {
  height: 100%;
  width: 100%;
}
</style>