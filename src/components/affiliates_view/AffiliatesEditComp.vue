<template>
  <div class="affiliates-edit-comp fade-left px-3 px-sm-8 py-4" :class="{ active: showEffect, 'fade-right': exit }">
    <v-container fluid>
      <div class="d-flex align-center">
        <v-btn color="light" class="mr-3" icon depressed @click="cancel()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <h2 class="mb-0">Editar registro</h2>
      </div>
    </v-container>
    <v-container class="px-8 px-sm-3 mb-6 mb-sm-0" style="height: 100%;">
      <v-form ref="formEditAffiliate" v-model="validForm" lazy-validation class="d-flex flex-column justify-space-between" style="height: 100%">
        <v-row class="mb-8">
          <v-col cols="12" sm="3">
            <v-row>
              <v-col cols="6" sm="12" v-if="userCreator !== undefined">
                <h5 class="mb-2 tw-regular">Creado por</h5>
                <div class="profile-user mb-4">
                  <img :src="require(`@/assets/profile/profile_${userCreator.image ?? 1}.png`)"/>
                  <div>
                    <h5 class="ts-text-light mb-0">{{ userCreator.name }} {{ userCreator.lastname}}</h5>
                    <p class="ts-small mb-0">{{ userCreator.username }}</p>
                    <span class="ts-small">{{ getDateTimeFormatTimezone(register.createdAt) }}</span>
                  </div>
                </div>
              </v-col>
              <v-col cols="6" sm="12" v-if="userModifier !== undefined">
                <h5 class="mb-2 tw-regular">Modificado por</h5>
                <div class="profile-user">
                  <img :src="require(`@/assets/profile/profile_${userModifier.image ?? 1}.png`)"/>
                  <div>
                    <h5 class="ts-text-light mb-0">{{ userModifier.name }} {{ userModifier.lastname}}</h5>
                    <p class="ts-small mb-0">{{ userModifier.username }}</p>
                    <span class="ts-small">{{ getDateTimeFormatTimezone(register.updatedAt) }}</span>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" sm="9">
            <v-row class="mb-6">
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

            <!-- ///////////////////////////////////////////////////////////////////////////
              ////////////////////////////////////////////////////////////////////////////////
              ////////////////////////////////////////////////////////////////////////////////
              ////////////////////// INFORMACION PERSONAL DEL REGISTRO /////////////////////// -->

            <v-row class="mb-6">
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

              <!-- MUNICIPIO -->
              <v-col cols="12" sm="3" class="pb-0">
                <v-select
                  v-model="register.township"
                  label="Municipio"
                  :rules="[rules.required]"
                  :items="townships"
                  outlined
                  dense
                  required
                ></v-select>
              </v-col>

              <!-- CIUDAD -->
              <v-col cols="12" sm="3" class="pb-0">
                <v-combobox
                  v-model="register.city"
                  label="Ciudad"
                  :rules="[rules.required]"
                  :items="towns"
                  outlined
                  dense
                  required
                ></v-combobox>
              </v-col>

              <!-- COLONIA -->
              <v-col cols="6" sm="4" class="pb-0">
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

            <!-- ///////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////
            ////////////////////// INFORMACION DE CONTACTO ///////////////////////////////// -->

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
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <div class="d-flex justify-space-between pb-8">
          <v-btn
            :disabled="loading"
            color="error"
            text
            class="mr-4"
            @click="deleteAffiliate()"
          >
            <v-icon style="font-size: 18px">mdi-trash-can-outline</v-icon>
            <span class="d-none d-sm-flex tc-error">Eliminar</span>
          </v-btn>
          <div class="d-flex">
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
              Guardar
            </v-btn>
          </div>
        </div>

      </v-form>
    </v-container>
    <AffiliatesDeleteDialogComp :show="deleteDialog" :affiliate="register" v-on:updateShow="deleteDialog = $event" />
  </div>
</template>

<script>
import { validateNumber, validateText, validateNumberText, validateEmail } from "@/utils//keyPressValidate";
import AffiliatesDeleteDialogComp from "@/components/affiliates_view/AffiliatesDeleteDialogComp";
import AffiliatesServices from '@/services/AffiliatesServices';
import UserServices from '@/services/UserServices';
import { municipiosList } from '@/constants/MunicipiosList';
import { LaPazTownshipTowns } from '@/constants/towns/LaPazTownshipTowns';
import { LosCabosTownshipTowns } from '@/constants/towns/LosCabosTownshipTowns';
import { MulegeTownshipTowns } from '@/constants/towns/MulegeTownshipTowns';
import { ComonduTownshipTowns } from '@/constants/towns/ComonduTownshipTowns';
import { LoretoTownshipTowns } from '@/constants/towns/LoretoTownshipTowns';
import { errorEditAffiliate } from "@/utils/errors/errorEditAffiliate";
import { errorGetUser } from "@/utils/errors/errorGetUser";
import { showSnackbar } from "@/utils/showSnackbar";
import moment from 'moment';
export default {
  name: 'AffiliatesEditComp',
  components: {
    AffiliatesDeleteDialogComp
  },
  data() {
    return {
      exit: false,
      showEffect: false,
      menuFechaRegistro: false,
      townships: municipiosList,
      towns: [],
      validForm: false,
      loading: false,
      deleteDialog: false,
      rules: {
        required: (v) => !!v || "Este campo es requerido",
        minLength: (v) => (v && v.length >= 10) || "Debe contener al menos 10 caracteres",
        minLengthElector: (v) => (v && v.length == 18) || "Debe contener exactamente 18 caracteres",
        minLengthPhone : (v) => (v && v.length == 10 || v == '') || "Debe contener 10 dígitos",
        email: (v) => (/.+@.+\..+/.test(v) || v == '') || "Email no válido",
      },
      register: {},
      userCreator: {},
      userModifier: {},
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    updateRegister: {
      type: Object,
      default: () => ({}),
    },
  },
  async created() {
    // clone updateRegister to register without reference
    this.register = JSON.parse(JSON.stringify(this.updateRegister));

    // Initialize the register fields correctly
    this.register.dateRegister = new Date(this.register.dateRegister || Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
    this.register.phoneNumber = this.register.phoneNumber?.toString() || "";
    this.register.cellPhoneNumber = this.register.cellPhoneNumber?.toString() || "";

    // Get the user creator and modifier
    this.userCreator = await this.getUser(this.register.createdBy);
    this.register.createdBy != this.register.updatedBy ? this.userModifier = await this.getUser(this.register.updatedBy) : this.userModifier = this.userCreator;

    // Get the cities of the township
    this.changeTowns();
  },
  mounted() { 
    setTimeout(() => {
      this.showEffect = true;
    }, 100);
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.register.dateRegister);
    },
    showProp: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit('updateShow', value);
      },
    },
  },
  methods: {
    async validate() {
      await this.$refs.formEditAffiliate.validate();
      if(!!this.validForm) {
        this.updateAffiliate();
      }
    },

    async updateAffiliate() {
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      const response = await AffiliatesServices.updateAffiliate(this.register)
      if(response) {
        if(response.status === 200) {
          showSnackbar('Registro actualizado con éxito', 'success');
          this.exit = true;
          setTimeout(() => {
            this.$parent.reloadAffiliates();
            this.showProp = false;
          }, 200);
        } else {
          errorEditAffiliate(response)
        }
      } else showSnackbar('No hay conexión con el servidor', 'red');
      this.loading = false;
    },

    async getUser(id) {
      const response = await UserServices.getUserSimple(id);
      if(response) {
        if(response.status === 200) {
          return response.data
        } else {
          errorGetUser(response)
        }
      } else showSnackbar('No hay conexión con el servidor', 'red');
    },

    deleteAffiliate() {
      this.deleteDialog = true;
    },

    deleteSuccess() {
      this.exit = true;
      setTimeout(() => {
        this.$parent.reloadAffiliates();
        this.showProp = false;
      }, 200);
    },

    cancel() {
      this.exit = true;
      setTimeout(() => {
        this.showProp = false;
      }, 200);
    },


    // Change Towns base on the selected Township
    changeTowns() {
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

    getDateTimeFormatTimezone(date) {
      const dateTimezone = moment(date);
      return dateTimezone.format('DD/MM/YYYY HH:mm:ss');
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
}
</script>

<style lang="scss" scoped>
.affiliates-edit-comp {
  position: absolute;
  top: 0;
  right: -998px;
  height: 100%;
  width: 100%;
  max-width: 998px;
  background-color: var(--color-white);
  box-shadow: var(--bs-dark);
  transition: 0.2s ease-in-out;
  border-left: 1px solid var(--color-background-dark);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.profile-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  img {
    width: 100%;
    max-width: 36px;
    height: 100%;
    object-fit: cover;
  }
}

.affiliates-edit-comp.active {
  right: 0;
}

.fade-right {
  right: -998px !important;
}
</style>