<template>
  <div class="members-edit-comp fade-left px-3 px-sm-8 py-4" :class="{ active: showEffect, 'fade-right': exit }">
    <v-container fluid>
      <div class="d-flex align-center">
        <v-btn color="light" class="mr-3" icon depressed @click="cancel()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <h2 class="mb-0">Editar registro</h2>
      </div>
    </v-container>
    <v-container class="px-8 px-sm-3 mb-6 mb-sm-0" style="height: 100%;">
      <v-form ref="formEditMember" v-model="validForm" lazy-validation class="d-flex flex-column justify-space-between" style="height: 100%">
        <v-row class="mb-8">
          <v-col cols="12" sm="3">
            <v-row>
              <v-col cols="6" sm="12">
                <h5 class="mb-2 tw-regular">Creado por</h5>
                <div class="profile-user mb-4">
                  <img :src="require(`@/assets/profile/profile_${userCreator.image || 1}.png`)"/>
                  <div>
                    <h5 class="ts-text-light mb-0">{{ userCreator.name }} {{ userCreator.lastname}}</h5>
                    <p class="ts-small mb-0">{{ userCreator.username }}</p>
                    <span class="ts-small">{{ getDateTimeFormatTimezone(register.createdAt) }}</span>
                  </div>
                </div>
              </v-col>
              <v-col cols="6" sm="12">
                <h5 class="mb-2 tw-regular">Modificado por</h5>
                <div class="profile-user">
                  <img :src="require(`@/assets/profile/profile_${userModifier.image || 1}.png`)"/>
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
              <!-- CLAVE DE ELECTOR -->
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="register.electoralKey"
                  label="Clave de Elector"
                  @keypress="validateNumberText($event, register.electoralKey, 18)"
                  :counter="18"
                  :rules="[rules.required, rules.minLengthElector]"
                  class="input-uppercase"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- CURP -->
              <v-col cols="12" sm="8" class="pb-0">
                <v-text-field
                  v-model="register.curp"
                  label="CURP"
                  @keypress="validateNumberText($event, register.curp, 18)"
                  :counter="18"
                  :rules="[rules.required, rules.minLengthElector]"
                  class="input-uppercase"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- # AFILIACION -->
              <v-col cols="6" sm="4" class="pb-0">
                <v-text-field
                  v-model="register.memberId"
                  label="No. de afiliación"
                  :rules="[rules.required]"
                  @keypress="validateNumber($event, register.memberId, 6)"
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

              <!-- DIRECCION -->
              <v-col cols="12" sm="12" class="pb-0">
                <v-text-field
                  v-model="register.address"
                  :rules="[rules.required]"
                  @keypress="validateLength($event, register.street, 200)"
                  prepend-inner-icon="mdi-sign-direction"
                  label="Dirección"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- FECHA DE NACIMIENTO -->
              <v-col cols="6" sm="6" class="pb-0">
                <v-menu
                  ref="menuFechaNacimiento"
                  v-model="menuFechaNacimiento"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="computedDateFormatted"
                      label="Fecha de nacimiento"
                      :rules="[]"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="register.birthDate"
                    @input="menuFechaRegistro = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <!-- PROFESION -->
              <v-col cols="6" sm="6" class="pb-0">
                <v-text-field
                  v-model="register.profession"
                  :rules="[rules.required]"
                  @keypress="validateLength($event, register.profession, 60)"
                  label="Profesión"
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
                  v-model="register.phoneNumber"
                  label="Teléfono celular"
                  prepend-inner-icon="mdi-phone"
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

              <!-- ACTIVO -->
              <v-col cols="12" sm="4" class="pb-0"> 
                <v-switch
                  v-model="register.active"
                  class="mt-1"
                  hide-details
                  inset
                  label="Miembro activo"
                ></v-switch>
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
            @click="deleteMember()"
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
    <MembersDeleteDialogComp :show="deleteDialog" :member="register" v-on:updateShow="deleteDialog = $event"/>
  </div>
</template>

<script>
import { validateNumber, validateText, validateNumberText, validateEmail } from "@/utils//keyPressValidate";
import MembersDeleteDialogComp from "@/components/members_view/MembersDeleteDialogComp";
import MembersServices from '@/services/MembersServices';
import UserServices from '@/services/UserServices';
import { errorEditMember } from "@/utils/errors/errorEditMember";
import { errorGetUser } from "@/utils/errors/errorGetUser";
import { showSnackbar } from "@/utils/showSnackbar";
import moment from 'moment';
export default {
  name: 'MembersEditComp',
  components: {
    MembersDeleteDialogComp
  },
  data() {
    return {
      exit: false,
      showEffect: false,
      menuFechaNacimiento: false,
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
    this.register.phoneNumber = !!this.register.phoneNumber ? this.register.phoneNumber.toString() : '';
    this.register.birthDate = new Date(this.register.birthDate || Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
    this.userCreator = await this.getUser(this.register.createdBy);
    this.register.createdBy != this.register.updatedBy ? this.userModifier = await this.getUser(this.register.updatedBy) : this.userModifier = this.userCreator;
  },
  mounted() { 
    setTimeout(() => {
      this.showEffect = true;
    }, 100);
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.register.birthDate);
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
      await this.$refs.formEditMember.validate();
      if(!!this.validForm) {
        this.updateMember();
      }
    },

    async updateMember() {
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      const response = await MembersServices.updateMember(this.register)
      if(response) {
        if(response.status === 200) {
          showSnackbar('Registro actualizado con éxito', 'success');
          this.exit = true;
          setTimeout(() => {
            this.$parent.reloadMembers();
            this.showProp = false;
          }, 200);
        } else {
          errorEditMember(response)
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

    cancel() {
      this.exit = true;
      setTimeout(() => {
        this.showProp = false;
      }, 200);
    },

    deleteMember() {
      this.deleteDialog = true;
    },

    deleteSuccess() {
      this.exit = true;
      setTimeout(() => {
        this.$parent.reloadMembers();
        this.showProp = false;
      }, 200);
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
  }
}
</script>

<style lang="scss" scoped>
.members-edit-comp {
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

.members-edit-comp.active {
  right: 0;
}

.fade-right {
  right: -998px !important;
}
</style>