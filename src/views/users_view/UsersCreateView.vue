<template>
  <div class="users-create-view animation-fade-left">
    <v-container class="px-8 px-sm-3">
      <h2 class="mb-3 mb-sm-0">Crear nuevo usuario</h2>
      <div class="d-flex justify-space-between align-center">
        <RouteDirectoryComp :items="routeItems" />
        <v-btn color="light" icon depressed @click="reset()">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-container class="px-8 px-sm-3 mb-6 mb-sm-0">
      <v-form ref="formNewUser" v-model="validForm" lazy-validation>
        <v-row class="mb-8">
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
        </v-row>

        <v-row class="mb-8">
          <v-col cols="12" sm="4">
            <v-divider class="mb-3"></v-divider>
            <h4>Información del usuario</h4>
            <p class="ts-small tc-text-light">
              Llenar los campos relacionados al registro
            </p>
          </v-col>

          <v-col cols="12" sm="8">
            <v-row>
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
                  @keypress="validateText($event, user.username, 30)"
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
                  v-model="user.password"
                  label="Contraseña"
                  @keypress="validatePassword($event, user.password, 16)"
                  :rules="[rules.required, rules.minLength]"
                  :append-icon="
                    showPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                  "
                  @click:append="() => (showPass = !showPass)"
                  :type="showPass ? 'text' : 'password'"
                  autocomplete="new-password"
                  outlined
                  dense
                  required
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
import UserServices from "@/services/UserServices";
import {
  validateNumber,
  validateText,
  validateNumberText,
  validateEmail,
  validatePassword,
} from "@/utils/keyPressValidate";
import { showSnackbar } from "@/utils/showSnackbar";
export default {
  name: "UsersCreateView",
  metaInfo: { title: "Nuevo Usuario" },
  components: {
    RouteDirectoryComp,
  },
  data() {
    return {
      loading: false,
      validForm: false,
      showPass: false,
      routeItems: [
        { name: "Inicio", disabled: false, route: "/dashboard" },
        { name: "Usuarios", disabled: false, route: "/users" },
        { name: "Nuevo Usuario", disabled: true, route: "/users/new" },
      ],
      rules: {
        required: (v) => !!v || "Este campo es requerido",
        minLength: (v) =>
          (v && v.length >= 8) || "Debe contener al menos 8 caracteres",
        email: (v) => /.+@.+\..+/.test(v) || v == "" || "Email no válido",
      },

      user: {
        name: "",
        lastname: "",
        username: "",
        email: "",
        image: 1,
        password: "",
        usertype: "editor",
      },
    };
  },
  methods: {
    async validate() {
      await this.$refs.formNewUser.validate();
      if(!!this.validForm) {
        this.createUser();
      }
    },

    cancel() {
      this.$router.push("/users");
    },

    async createUser() {
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      const response = await UserServices.createUser(this.user)
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
      this.$refs.formNewUser.resetValidation();
      this.setStartValues();
    },

    setStartValues() {
      this.user = {
        name: "",
        lastname: "",
        username: "",
        email: "",
        image: 1,
        password: "",
        usertype: "editor",
      };
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
};
</script>

<style lang="scss" scoped>
.users-create-view {
  height: 100%;
  width: 100%;
  overflow-y: auto;

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
}
</style>
