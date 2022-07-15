<template>
  <div>
    <div class="login-view">
      <div class="left-section">
        <div class="d-flex w-100">
          <span class="ts-h1 tc-primary" style="line-height: 0.9;">•</span>
          <h4 class="tw-medium ts-h3"><span class="tw-black">Form</span>Typer</h4>
        </div>
        <div class="login-card d-flex flex-column">
          <h4 class="ts-h2 tw-bold mb-2">Bienvenido de vuelta</h4>
          <p class="ts-small tc-text-light mb-4">Para entrar escribe tus credenciales de usuario</p>
          <v-form class="login-form" ref="form" v-model="valid" lazy-validation>
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="emailRules"
              outlined
              dense
              :disabled="loading"
              required
              @keydown.enter="validate"
            ></v-text-field>

            <v-text-field
              label="Contraseña"
              v-model="password"
              :rules="passwordRules"
              type="password"
              outlined
              dense
              :disabled="loading"
              required
              @keydown.enter="validate"
            ></v-text-field>

            <v-switch
              v-model="rememberSession"
              label="Recordar inicio de sesión"
              color="#8915ef"
              hide-details
              class="pb-5"
              :disabled="loading"
            ></v-switch>

            <v-btn class="mr-4 btn-login" @click="validate" :loading="loading" :disabled="loading">
              Ingresar
            </v-btn>
            <p class="ts-small text-center mt-4">¿Olvidaste tu contraseña? <router-link to='/forgotpass' class="tc-primary">Haz click aquí</router-link></p>
          </v-form>
        </div>
        <div class="d-flex w-100">
          <span class="tw-medium tc-text-light ts-smaller">Ⓒ codera - 2022</span>
        </div>
      </div>
      <div class="right-section d-none d-sm-flex">
        <img src="@/assets/img/login-image.svg" />
      </div>
    </div>


    <!-- SNACKBAR -->
    <v-snackbar
      v-model="snackbar"
      timeout="4000"
    >
      {{ errorText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import AuthServices from '@/services/authServices';
import { setAuthToken, setRememberSesion, setUser } from "../auth/index";
import store from '@/store';
export default {
  name: 'LoginView',
  data() {
    return {
      email: "",
      password: "",
      valid: true,
      rememberSession: false,
      loading: false,
      snackbar: false,
      errorText: "",
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+\..+/.test(v) || 'El E-mail tiene formato válido',
      ],
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
        v => v.length >= 8 || 'La contraseña debe tener al menos 6 caracteres',
      ],
    }
  },
  created() {
    this.rememberSession = store.getters.getRememberSesion;
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if(this.valid) {
        this.signIn();
      }
    },
    
    async signIn() {
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(2000);
      const response = await AuthServices.loginUser({ email: this.email, password: this.password})
      if(response) {
        if(response.status === 200) {
          this.setUserLogin(response);
          this.$router.push('/dashboard');
        } else {
          if(response.status == 400 || response.status == 401){
            this.errorText = 'No se ha encontrado un usuario con esas credenciales';
            this.snackbar = true;
          } 
          else if(response.status == 500) {
            if(response.data.error == 'incorrectPassword') {
              this.errorText = 'La contraseña es incorrecta';
              this.snackbar = true;
            } else if(response.data.error == 'internalError') {
              this.errorText = 'Ocurrió un error en el servidor';
              this.snackbar = true;
            }
          }
          else {
            this.errorText = 'Ocurrió un error en el servidor';
            this.snackbar = true;
          }
        }
      } else {
        this.errorText = 'No hay conexión con el servidor';
        this.snackbar = true;
      };
      this.loading = false;
    },

    // Método para setear los valores
    setUserLogin(user) {
      setAuthToken(user.data.token);
      setUser(user.data.user);
      setRememberSesion(this.rememberSession);
    },
  }
}
</script>

<style lang="scss" scoped>
.login-view {
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: var(--color-background);

  .left-section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-medium);
    background-color: var(--color-white);
    padding: 2rem;

    .login-card {
      width: 100%;
      max-width: 320px;
    }

    .login-form {
      width: 100%;
    }

    .btn-login {
      width: 100%;
      background-color: var(--color-primary);
      color: var(--color-white);
      font-weight: var(--font-medium);
      font-size: var(--font-size-medium);
      border-radius: 8px;
      border: none;
    }
  }

  .right-section {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;

    img {
      width: 100%;
      max-width: 320px;
    }
  }

  @media only screen and (min-width: 960px) {
    .left-section {
      width: 50%;
    }
  }
}
</style>