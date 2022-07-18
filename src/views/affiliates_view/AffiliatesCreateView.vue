<template>
  <div class="affiliates-create-view animation-fade-left">
    <v-container>
      <h1 class="mb-3 mb-sm-0">Crear nuevo registro</h1>
      <RouteDirectoryComp :items="routeItems" />
    </v-container>
    <v-container>
      <v-form ref="formNewAffiliate" v-model="validForm" lazy-validation>
        <v-row class="mb-8">
          <v-col cols="12" sm="4">
            <h4>Información del registro</h4>
            <p class="ts-small tc-text-light">Llenar los campos relacionados al registro</p>
          </v-col>

          <v-col cols="12" sm="8">
            <v-row>
              <!-- CLAVE DE ELECTOR / CURP -->
              <v-col cols="12" class="pb-0">
                <v-text-field
                  label="Clave de Elector / CURP"
                  :counter="18"
                  :rules="[rules.required, rules.minLengthElector]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- FECHA DE REGISTRO -->
              <v-col cols="12" sm="4" class="pb-0">
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
                      v-model="computedDateFormatted"
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
                    v-model="dateRegister"
                    @input="menuFechaRegistro = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <!-- EMAIL -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  label="E-mail"
                  :rules="[rules.required, rules.email]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <h4>Información personal</h4>
            <p class="ts-small tc-text-light">Llenar los campos relacionados a la persona</p>
          </v-col>

          <v-col cols="12" sm="8">
            <v-row>
              <!-- NOMBRE -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
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
                  label="Apellido materno"
                  :rules="[rules.required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <!-- EMAIL -->
              <v-col cols="12" sm="4" class="pb-0">
                <v-text-field
                  label="E-mail"
                  :rules="[rules.required, rules.email]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>
            </v-row>
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
  metaInfo: { title: "Nuevo Afiliado" },
  components: {
    RouteDirectoryComp,
  },
  data() {
    return {
      menuFechaRegistro: false,
      routeItems: [
        { name: "Inicio", disabled: false, route: "/dashboard" },
        { name: "Afiliados", disabled: false, route: "/affiliates" },
        { name: "Nuevo Afiliado", disabled: true, route: "/newaffiliate" },
      ],
      validForm: true,
      rules: {
        required: (v) => !!v || "Este campo es requerido",
        minLength: (v) => (v && v.length >= 10) || "Debe contener al menos 10 caracteres",
        minLengthElector: (v) => (v && v.length == 18) || "Debe contener exactamente 18 caracteres",
        email: (v) => /.+@.+\..+/.test(v) || "Email no válido",
      },

      dateRegister: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      name: "",
      email: "",
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.dateRegister);
    },
  },
  methods: {
    validate() {
      this.$refs.formNewAffiliate.validate();
    },

    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
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