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
              <!-- <v-col cols="12" class="pb-0">
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
              </v-col> -->

              <!-- NOMBRE -->
              <v-col cols="12" sm="6" md="4" class="pb-0">
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
              <v-col cols="12" sm="6" md="4" class="pb-0">
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
              <v-col cols="12" sm="6" md="4" class="pb-0">
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

              <!-- FECHA DE REGISTRO -->
              <v-col cols="6" sm="6" md="3" class="pb-0">
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
                      label="Cumpleaños"
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
                    v-model="register.birthdate"
                    @input="menuFechaRegistro = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <!-- Tipo de registro -->
              <v-col cols="6" sm="6" md="3" class="pb-0">
                <v-select
                  v-model="register.typeRegister"
                  label="Tipo de registro"
                  :items="['Simpatizante','Afiliación', 'Ratificación']"
                  dense
                  outlined
                ></v-select>
              </v-col>

              <!-- DISTRITO FEDERAL -->
              <!-- <v-col cols="6" sm="3" class="pb-0">
                <v-select
                  v-model="register.federalDistrict"
                  label="Distrito Federal"
                  :items="[1, 2]"
                  prepend-inner-icon="mdi-pound"
                  outlined
                  dense
                  required
                ></v-select>
              </v-col> -->

              <!-- SECCION ELECTORAL -->
              <v-col cols="6" sm="6" md="3" class="pb-0">
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

              <!-- TELEFONO CELULAR -->
              <v-col cols="6" sm="6" md="3" class="pb-0">
                <v-text-field
                  v-model="register.phoneNumber"
                  label="Teléfono/celular"
                  prepend-inner-icon="mdi-phone"
                  :rules="[rules.minLengthPhone]"
                  @keypress="validateNumber($event, register.phoneNumber, 10)"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <!-- TELEFONO CASA -->
              <!-- <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="register.phoneNumber"
                  label="Teléfono de casa"
                  prepend-inner-icon="mdi-phone-classic"
                  :rules="[rules.minLengthPhone]"
                  @keypress="validateNumber($event, register.phoneNumber, 10)"
                  outlined
                  dense
                ></v-text-field>
              </v-col> -->

              <!-- EMAIL -->
              <!-- <v-col cols="12" sm="6" md="3" class="pb-0">
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
              </v-col> -->

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
            <h4>Información de dirección</h4>
            <p class="ts-small tc-text-light">Llenar los campos relacionados a la persona</p>
          </v-col>

          <v-col cols="12" sm="8">
            <v-row>
              <!-- CALLE -->
              <v-col cols="12" sm="6" md="8" class="pb-0">
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
              <v-col cols="6" sm="3" md="2" class="pb-0">
                <v-text-field
                  v-model="register.extnum"
                  label="No. Ext"
                  @keypress="validateNumberText($event, register.extnum, 6)"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <!-- NO.INT -->
              <v-col cols="6" sm="3" md="2" class="pb-0">
                <v-text-field
                  v-model="register.intnum"
                  label="No. Int"
                  @keypress="validateNumberText($event, register.intnum, 6)"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <!-- COLONIA -->
              <v-col cols="6" sm="6" md="4" class="pb-0">
                <v-text-field
                  v-model="register.neighborhood"
                  label="Colonia"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- CP -->
              <v-col cols="6" sm="6" md="2" class="pb-0">
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

              <!-- MUNICIPIO -->
              <v-col cols="12" sm="6" md="3" class="pb-0">
                <v-select
                  v-model="register.township"
                  label="Municipio"
                  :rules="[rules.required]"
                  @change="changeTowns()"
                  :items="townships"
                  outlined
                  dense
                  required
                ></v-select>
              </v-col>

              <!-- CIUDAD -->
              <v-col cols="12" sm="6" md="3" class="pb-0">
                <v-combobox
                  v-model="register.city"
                  label="Ciudad"
                  :items="towns"
                  :rules="[rules.required]"
                  autocomplete="false"
                  outlined
                  dense
                  required
                ></v-combobox>
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
            <h4>Gestión social</h4>
            <p class="ts-small tc-text-light">Agrega las observaciones y/o peticiones del registro</p>
          </v-col>

          <v-col cols="12" sm="8">
            <v-row v-for="(item, index) of register.requests" :key="`requests-${index}`">
              <v-col cols="3" sm="4" md="3" class="pb-0">
                <v-select
                  v-model="register.requests[index].type"
                  label="Tipo"
                  :items="requestTypes"
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="9" sm="8" md="9" class="pb-0">
                <v-text-field
                  v-model="register.requests[index].value"
                  label="Observaciones"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="d-flex gap-5">
              <v-btn fab dark small color="primary" @click="addNewRequest()">
                <v-icon> mdi-plus </v-icon>
              </v-btn>
              <v-btn fab dark small color="error" v-if="register.requests.length > 1" @click="removeLastRequest()">
                <v-icon> mdi-minus </v-icon>
              </v-btn>
            </div>
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
import { RequestTypes, RequestTypesArray } from "@/constants/AffiliatesSortOptions";
import { validateNumber, validateText, validateNumberText, validateEmail } from "@/utils/keyPressValidate";
import { municipiosList } from '@/constants/MunicipiosList';
import { LaPazTownshipTowns } from '@/constants/towns/LaPazTownshipTowns';
import { LosCabosTownshipTowns } from '@/constants/towns/LosCabosTownshipTowns';
import { MulegeTownshipTowns } from '@/constants/towns/MulegeTownshipTowns';
import { ComonduTownshipTowns } from '@/constants/towns/ComonduTownshipTowns';
import { LoretoTownshipTowns } from '@/constants/towns/LoretoTownshipTowns';
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
      townships: municipiosList,
      towns: [],
      requestTypes: RequestTypesArray,
      routeItems: [
        { name: "Inicio", disabled: false, route: "/dashboard" },
        { name: "Afiliados", disabled: false, route: "/affiliates" },
        { name: "Nuevo Afiliado", disabled: true, route: "/newaffiliate" },
      ],
      rules: {
        required: (v) => !!v || "Este campo es requerido",
        minLength: (v) => (v && v.length >= 10) || "Debe contener al menos 10 caracteres",
        minLengthElector: (v) => (v && v.length == 18) || "Debe contener exactamente 18 caracteres",
        minLengthPhone : (v) => (v && v.length == 10 || v == '') || "Debe contener 10 dígitos",
        email: (v) => (/.+@.+\..+/.test(v) || v == '') || "Email no válido",
      },

      register: {
        typeRegister: "Simpatizante",
        birthdate: new Date(1980, 0, 1).toISOString().substr(0, 10),
        name: "",
        fatherSurname: "",
        motherSurname: "",
        street: "",
        extnum: "",
        intnum: "",
        neighborhood: "",
        city: "",
        township: "La Paz",
        cp: "",
        electoralSection: "",
        phoneNumber: "",
        requests: [
          { type: RequestTypes.Urbanismo, value: "" },
        ],
        // electoralKeyCurp: "",
        signed: true,
      }
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.register.birthdate);
    },
  },
  mounted() {
    this.changeTowns();
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
      this.clearEmptyRequests();
      const response = await AffiliatesServices.createAffiliate(this.register)
      if(response) {
        if(response.status === 200) {
          showSnackbar('Registro creado con éxito', 'success');
          this.reset();
        } else {
          errorCreateAffiliate(response.data)
        }
      } else showSnackbar('No hay conexión con el servidor', 'red');
      this.loading = false;
    },

    reset() {
      this.$refs.formNewAffiliate.resetValidation()
      this.setStartValues()
    },

    setStartValues() {
      this.register.birthdate = new Date(1980, 0, 1).toISOString().substr(0, 10);
      this.register.typeRegister = "Simpatizante";
      this.register.name = "";
      this.register.fatherSurname = "";
      this.register.motherSurname = "";
      this.register.street = "";
      this.register.extnum = "";
      this.register.intnum = "";
      this.register.neighborhood = "";
      this.register.city = "";
      this.register.township = "La Paz";
      this.register.cp = "";
      this.register.electoralSection = "";
      this.register.phoneNumber = "";
      this.register.requests = [ { type: RequestTypes.Urbanismo, value: "" }, ];
      this.register.signed = true;
    },


    // Change Towns base on the selected Township
    changeTowns() {
      this.register.city = "";
      const township = this.register.township;
      switch(township) {
        case "La Paz":
          this.towns = LaPazTownshipTowns;
          break;
        case "Los Cabos":
          this.towns = LosCabosTownshipTowns;
          break;
        case "Mulegé":
          this.towns = MulegeTownshipTowns;
          break;
        case "Comondú":
          this.towns = ComonduTownshipTowns;
          break;
        case "Loreto":
          this.towns = LoretoTownshipTowns;
          break;
        default:
          this.towns = [];
      }
    },

    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    addNewRequest() {
      this.register.requests.push({ type: RequestTypes.Urbanismo, value: "" });
    },

    removeLastRequest() {
      this.register.requests.pop();
    },

    clearEmptyRequests() {
      this.register.requests = this.register.requests.filter(request => request.value !== "");
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