<template>
  <div class="affiliates-create-view animation-fade-left">
    <v-container>
      <h1 class="mb-3 mb-sm-0">Crear nuevo registro</h1>
      <RouteDirectoryComp :items="routeItems" />
    </v-container>
    <v-container>
      <v-form ref="formNewAffiliate" v-model="validForm" lazy-validation>
        <v-row>
          <v-col cols="12">
            <h4>Información personal</h4>
          </v-col>
          
          <!-- NOMBRE -->
          <v-col cols="12" sm="4">
            <v-text-field
              label="Nombre"
              :rules="[rules.required]"
              variant="outlined"
              density="compact"
              required
            ></v-text-field>
          </v-col>

          <!-- APELLIDO PATERNO -->
          <v-col cols="12" sm="4">
            <v-text-field
              label="Apellido paterno"
              :rules="[rules.required]"
              variant="outlined"
              density="compact"
              required
            ></v-text-field>
          </v-col>

          <!-- APELLIDO MATERNO -->
          <v-col cols="12" sm="4">
            <v-text-field
              label="Apellido materno"
              :rules="[rules.required]"
              variant="outlined"
              density="compact"
              required
            ></v-text-field>
          </v-col>

          <!-- APELLIDO MATERNO -->
          <v-col cols="12" sm="4">
            <v-text-field
              label="Fecha de registro"
              :rules="[rules.required]"
              variant="outlined"
              density="compact"
              required
            ></v-text-field>
          </v-col>

          <!-- EMAIL -->
          <v-col cols="12" sm="4">
            <v-text-field
              label="E-mail"
              :rules="[rules.required, rules.email]"
              variant="outlined"
              density="compact"
              v-model="email"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          :disabled="!validForm"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import RouteDirectoryComp from "@/components/general/RouteDirectoryComp.vue";
export default {
  name: "AffiliatesCreateView",
  components: {
    RouteDirectoryComp,
  },
  data() {
    return {
      routeItems: [
        { name: "Inicio", disabled: false, route: "/dashboard" },
        { name: "Afiliados", disabled: false, route: "/affiliates" },    
        { name: "Nuevo Afiliado", disabled: true, route: "/newaffiliate" },
      ],
      validForm: true,
      name: '',
      rules: {
        required: v => !!v || 'Este campo es requerido',
        minLength: v => (v && v.length >= 10) || 'Debe contener al menos 10 caracteres',
        email: v => /.+@.+\..+/.test(v) || 'Email no válido',
      },
      email: '',
    };
  },
  methods: {
    validate () {
      this.$refs.formNewAffiliate.validate()
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