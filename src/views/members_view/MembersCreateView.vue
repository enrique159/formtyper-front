<template>
  <div class="members-create-view animation-fade-left">
    <v-container class="px-8 px-sm-3">
      <h2 class="mb-3 mb-sm-0">Crear nuevo miembro</h2>
      <div class="d-flex justify-space-between align-center">
        <RouteDirectoryComp :items="routeItems" />
        <v-btn color="light" icon depressed @click="reset()">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-container class="px-8 px-sm-3 mb-6 mb-sm-0">
      <v-form ref="formNewMember" v-model="validForm" lazy-validation>
        <v-row class="mb-8">
          <v-col cols="12" sm="4">
            <v-divider class="mb-3"></v-divider>
            <h4>Información del registro</h4>
            <p class="ts-small tc-text-light">Llenar los campos relacionados al registro</p>
          </v-col>

          <v-col cols="12" sm="8">
            <v-row>
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

              <!-- Tipo de registro -->
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
import MembersServices from '@/services/MembersServices';
import { validateNumber, validateText, validateNumberText, validateEmail } from "@/utils/keyPressValidate";
import { errorCreateMember } from '@/utils/errors/errorCreateMember'
import { showSnackbar } from "@/utils/showSnackbar";
export default {
  name: 'MembersCreateView',
  metaInfo: { title: "Nuevo Miembro" },
  components: {
    RouteDirectoryComp,
  },
  data() {
    return {
      menuFechaNacimiento: false,
      validForm: false,
      loading: false,
      routeItems: [
        { name: "Inicio", disabled: false, route: "/dashboard" },
        { name: "Miembros", disabled: false, route: "/members" },
        { name: "Nuevo Miembro", disabled: true, route: "/members/new" },
      ],
      rules: {
        required: (v) => !!v || "Este campo es requerido",
        minLength: (v) => (v && v.length >= 10) || "Debe contener al menos 10 caracteres",
        minLengthElector: (v) => (v && v.length == 18) || "Debe contener exactamente 18 caracteres",
        minLengthPhone : (v) => (v && v.length == 10 || v == '') || "Debe contener 10 dígitos",
        email: (v) => (/.+@.+\..+/.test(v) || v == '') || "Email no válido",
      },

      register: {
        memberId: '',
        name: '',
        fatherSurname: '',
        motherSurname: '',
        birthDate: null,
        address: '',
        profession: '',
        electoralKey: '',
        curp: '',
        phoneNumber: '',
        email: '',
      }
    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.register.birthDate);
    },
  },
  methods: {
    async validate() {
      await this.$refs.formNewMember.validate();
      if(!!this.validForm) {
        this.createMember();
      }
    },

    async createMember() {
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      const response = await MembersServices.createMember(this.register)
      if(response) {
        if(response.status === 200) {
          showSnackbar('Registro creado con éxito', 'success');
          this.reset();
        } else {
          errorCreateMember(response)
        }
      } else showSnackbar('No hay conexión con el servidor', 'red');
      this.loading = false;
    },

    cancel() {
      this.$router.push("/members");
    },

    reset() {
      this.$refs.formNewMember.reset()
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
  }
}
</script>

<style lang="scss" scoped>
.members-create-view {
  height: 100%;
  width: 100%;
  overflow-y: auto;
}
</style>