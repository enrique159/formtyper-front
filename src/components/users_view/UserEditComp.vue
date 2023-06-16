<template>
  <div class="user-edit-comp fade-left px-3 px-sm-8 py-4" :class="{ active: showEffect, 'fade-right': exit }">
    <v-container fluid>
      <div class="d-flex align-center">
        <v-btn color="light" class="mr-3" icon depressed @click="cancel()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <h2 class="mb-0">Editar registro</h2>
      </div>
    </v-container>
    <v-container class="px-8 px-sm-3 mb-6 mb-sm-0" style="height: 100%;">
      <v-form ref="formEditUser" v-model="validForm" lazy-validation class="d-flex flex-column justify-space-between" style="height: 100%">
        <v-row class="mb-8">
          <v-col cols="12">
            <v-row class="mb-6">
              <v-col cols="12" sm="4">
                <v-divider class="mb-3"></v-divider>
                <h4>Imagen de usuario</h4>
                <p class="ts-small tc-text-light">
                  Selecciona una imagen de avatar
                </p>
              </v-col>

              <v-col cols="12" sm="8">
                <div class="d-flex flex-wrap gap-6 justify-sm-start justify-center align-center">
                  <div
                    class="avatar-container"
                    :class="{ active: item == user.image }"
                    v-for="item in 5"
                    :key="item"
                    @click="user.image = item"
                  >
                    <v-avatar size="48" class="mx-auto">
                      <img :src="require(`@/assets/profile/profile_${item}.png`)" />
                    </v-avatar>
                  </div>
                </div>
              </v-col>
               <!-- USER NAME -->
               <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="user.name"
                  label="Nombre"
                  @keypress="validateText($event, user.name, 30)"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
              <!-- USER LAST NAME -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="user.lastname"
                  label="Apellidos"
                  @keypress="validateText($event, user.lastname, 30)"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
              <!-- USERNAME -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  v-model="user.username"
                  label="Nombre de usuario"
                  @keypress="validateNumberText($event, user.username, 30)"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
              <!-- EMAIL -->
              <v-col cols="12" sm="6" class="pb-0">
                <v-text-field
                  v-model="user.email"
                  label="Correo electrónico"
                  @keypress="validateEmail($event, user.username, 30)"
                  :rules="[rules.required, rules.email]"
                  autocomplete="false"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
              <!-- PASSWORD -->
              <v-col cols="12" sm="6" class="pb-0">
                <v-text-field
                  v-model="password"
                  label="Contraseña"
                  @keypress="validatePassword($event, password, 16)"
                  :rules="[rules.minLength]"
                  :append-icon=" showPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline' "
                  @click:append="() => (showPass = !showPass)"
                  :type="showPass ? 'text' : 'password'"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <!-- USERTYPE -->
              <v-col cols="12" sm="6" class="pb-0">
                <v-select
                  v-model="user.usertype"
                  :items="[{ text: 'Administrador', value: 'admin' }, { text: 'Editor', value: 'editor' }]"
                  label="Tipo de usuario"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-select>
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
            @click="deleteUser()"
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
    <UserDeleteDialogComp :show="deleteDialog" :user="user" v-on:updateShow="deleteDialog = $event" />
  </div>
</template>

<script>
  import UserDeleteDialogComp from './UserDeleteDialogComp.vue';
  import UserServices from '@/services/UserServices';
  import { errorEditUser } from "@/utils/errors/errorEditUser";
  import { showSnackbar } from "@/utils/showSnackbar";
  import moment from 'moment';
  import {
    validateNumber,
    validateText,
    validateNumberText,
    validateEmail,
    validatePassword,
  } from "@/utils/keyPressValidate";

  export default {
  name: 'UserEditComp',
  components: {
    UserDeleteDialogComp,
  },
  data() {
    return {
      exit: false,
      showEffect: false,
      validForm: false,
      loading: false,
      deleteDialog: false,
      showPass: false,
      password: '',
      rules: {
        required: (v) => !!v || "Este campo es requerido",
        minLength: (v) => (v.length >= 8 || v.length == 0) || "Debe contener al menos 8 caracteres",
        email: (v) => /.+@.+\..+/.test(v) || v == "" || "Email no válido",
      },
      user: {},
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
    this.user = JSON.parse(JSON.stringify(this.updateRegister));
  },
  mounted() { 
    setTimeout(() => {
      this.showEffect = true;
    }, 100);
  },
  computed: {
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
      await this.$refs.formEditUser.validate();
      if(!!this.validForm) {
        this.updateUser();
      }
    },

    async updateUser() {
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      if (this.password !== '') {
        this.user.password = this.password;
      }
      const response = await UserServices.updateUser(this.user)
      if(response) {
        if(response.status === 200) {
          showSnackbar('Registro actualizado con éxito', 'success');
          this.exit = true;
          setTimeout(() => {
            this.$parent.reloadMethods();
            this.showProp = false;
          }, 200);
        } else {
          errorEditUser(response.data)
        }
      } else showSnackbar('No hay conexión con el servidor', 'red');
      this.loading = false;
    },

    deleteUser() {
      this.deleteDialog = true;
    },

    deleteSuccess() {
      this.exit = true;
      setTimeout(() => {
        this.$parent.reloadMethods();
        this.showProp = false;
      }, 200);
    },

    cancel() {
      this.exit = true;
      setTimeout(() => {
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

    validatePassword(event, value, max) {
      if (value) {
        if (value.toString().length + 1 > max) {
          event.preventDefault();
        } else validatePassword(event);
      } else {
        validatePassword(event);
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
.user-edit-comp {
  position: absolute;
  top: 0;
  right: -720px;
  height: 100%;
  width: 100%;
  max-width: 720px;
  background-color: var(--color-white);
  box-shadow: var(--bs-dark);
  transition: 0.2s ease-in-out;
  border-left: 1px solid var(--color-background-dark);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.avatar-container {
  width: fit-content;
  aspect-ratio: 1;
  padding: 4px;
  border-radius: 50%;
  transition: var(--transition-rapida);
  border: 4px solid var(--color-background);
  cursor: pointer;

  &:hover {
    transform: scale(0.96);
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.avatar-container.active {
  border: 4px solid var(--color-blue);
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

.user-edit-comp.active {
  right: 0;
}

.fade-right {
  right: -998px !important;
}
</style>