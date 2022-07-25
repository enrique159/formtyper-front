<template>
  <div class="affiliates-create-view animation-fade-left">
    <v-container class="px-8 px-sm-3">
      <h2 class="mb-3 mb-sm-0">Crear nuevo registro</h2>
      <div class="d-flex justify-space-between align-center">
        <RouteDirectoryComp :items="routeItems" />
        <v-btn color="light" icon depressed @click="reset()">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-container class="px-8 px-sm-3 mb-6 mb-sm-0">
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
                  @keypress="validateNumberText($event, register.electoralKeyCurp, 18)"
                  :counter="18"
                  :rules="[rules.required, rules.minLengthElector]"
                  class="input-uppercase"
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
                      prepend-inner-icon="mdi-calendar"
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
                <v-select
                  v-model="register.federalDistrict"
                  label="Distrito Federal"
                  :items="[1, 2]"
                  prepend-inner-icon="mdi-pound"
                  outlined
                  dense
                  required
                ></v-select>
              </v-col>

              <!-- SECCION ELECTORAL -->
              <v-col cols="6" sm="3" class="pb-0">
                <v-text-field
                  v-model="register.electoralSection"
                  label="Sección Electoral"
                  :rules="[rules.required]"
                  @keypress="validateNumber($event, register.electoralSection, 4)"
                  prepend-inner-icon="mdi-pound"
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
                  @keypress="validateText($event, register.name, 30)"
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
                  @keypress="validateText($event, register.fatherSurname, 30)"
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
                  @keypress="validateText($event, register.motherSurname, 30)"
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
                  :rules="[rules.required]"
                  @keypress="validateLength($event, register.street, 100)"
                  prepend-inner-icon="mdi-sign-direction"
                  label="Calle"
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
                  @keypress="validateNumberText($event, register.extnum, 6)"
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
                  @keypress="validateNumberText($event, register.intnum, 6)"
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
                  label="Ciudad"
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
                  @keypress="validateNumber($event, register.cp, 5)"
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
                  :rules="[rules.minLengthPhone]"
                  @keypress="validateNumber($event, register.cellPhoneNumber, 10)"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <!-- TELEFONO CASA -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="register.phoneNumber"
                  label="Teléfono de casa"
                  prepend-inner-icon="mdi-phone-classic"
                  :rules="[rules.minLengthPhone]"
                  @keypress="validateNumber($event, register.phoneNumber, 10)"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <!-- EMAIL -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="register.email"
                  label="Correo electrónico"
                  prepend-inner-icon="mdi-email"
                  :rules="[rules.email]"
                  @keypress="validateEmail($event, register.email, 30)"
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
import AffiliatesServices from '@/services/AffiliatesServices';
import { validateNumber, validateText, validateNumberText, validateEmail } from "@/utils/keyPressValidate";
import { errorCreateAffiliate } from "@/utils/errors/errorCreateAffiliate";
import { showSnackbar } from "@/utils/showSnackbar";
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
        minLengthPhone : (v) => (v.length == 10 || v == '') || "Debe contener 10 dígitos",
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
        federalDistrict: 1,
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
      await delay(1000);
      const response = await AffiliatesServices.createAffiliate(this.register)
      if(response) {
        if(response.status === 200) {
          showSnackbar('Registro creado con éxito', 'success');
          this.reset();
        } else {
          errorCreateAffiliate(response)
        }
      } else showSnackbar('No hay conexión con el servidor', 'red');
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

    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    // Metodo para validar que el valor tecleado sea un numero
    validateNumber(event, value, max) {
      if (value) {
        if (value.toString().length + 1 > max) {
          event.preventDefault();
        } else validateNumber(event);
      } else {
        validateNumber(event);
      }
    },

    validateText(event, value, max) {
      if (value) {
        if (value.toString().length + 1 > max) {
          event.preventDefault();
        } else validateText(event);
      } else {
        validateText(event);
      }
    },

    validateNumberText(event, value, max) {
      if (value) {
        if (value.toString().length + 1 > max) {
          event.preventDefault();
        } else validateNumberText(event);
      } else {
        validateNumberText(event);
      }
    },

    validateEmail(event, value, max) {
      if (value) {
        if (value.toString().length + 1 > max) {
          event.preventDefault();
        } else validateEmail(event);
      } else {
        validateEmail(event);
      }
    },


    validateLength(event, value, max) {
      if (value) {
        if (value.length + 1 > max) {
          event.preventDefault();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.affiliates-create-view {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>