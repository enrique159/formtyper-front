<template>
  <v-dialog v-model="showProp" width="500">
    <v-card class="br-big">
      <v-card-title
        class="text-h5 lighten-2"
        style="font-family: Poppins !important"
      >
        ¿Desea eliminar este registro?
      </v-card-title>

      <v-card-text class="tc-text-dark tw-bold"
        >Registro: {{ affiliate.name }} {{ affiliate.fatherSurname }}
        {{ affiliate.motherSurname }}</v-card-text
      >

      <v-card-text>
        Recuerde que en caso de querer recuperar este registro podrá solicitarlo
        por medio de un administrador.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="light darken-4"
          text
          :disabled="loading"
          @click="showProp = false"
          >Cancelar</v-btn
        >
        <v-btn
          color="error"
          :disabled="loading"
          :loading="loading"
          text
          @click="deleteAffiliate()"
          >Eliminar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AffiliatesServices from "@/services/AffiliatesServices";
import store from "@/store";
export default {
  name: "AffiliatesDeleteDialogComp",
  props: ["show", "affiliate"],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    showProp: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("updateShow", val);
      },
    },
  },
  methods: {
    async deleteAffiliate() {
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      const response = await AffiliatesServices.deleteAffiliate(this.affiliate._id);
      if (response) {
        if (response.status === 200) {
          this.showSnackbar("Registro eliminado con éxito", "success");
          this.$parent.deleteSuccess();
          this.showProp = false;
        } else {
          if (response.status == 401)
            this.showSnackbar(
              "Usuario no válido para realizar esta operación",
              "red"
            );
          else this.showSnackbar("Ocurrió un error en el servidor", "red");
        }
      } else this.showSnackbar("No hay conexión con el servidor", "red");
      this.loading = false;
    },

    // SHOW SNACKBAR
    showSnackbar(text, color) {
      store.dispatch("setSnackbar", {
        show: true,
        text: text,
        color: color,
        timeout: 4000,
      });
    },
  },
};
</script>