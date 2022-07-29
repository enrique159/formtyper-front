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
        >Registro: {{ member.name }} {{ member.fatherSurname }}
        {{ member.motherSurname }}</v-card-text
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
          @click="deleteMember()"
          >Eliminar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import MembersServices from "@/services/MembersServices";
import { errorDeleteMember } from "@/utils/errors/errorDeleteMember";
import { showSnackbar } from "@/utils/showSnackbar";
export default {
  name: "MembersDeleteDialogComp",
  props: ["show", "member"],
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
    async deleteMember() {
      this.loading = true;
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(1000);
      const response = await MembersServices.deleteMember(this.member._id);
      if (response) {
        if (response.status === 200) {
          showSnackbar("Registro eliminado con éxito", "success");
          this.$parent.deleteSuccess();
          this.showProp = false;
        } else {
          errorDeleteMember(response);
        }
      } else showSnackbar("No hay conexión con el servidor", "red");
      this.loading = false;
    },
  },
};
</script>