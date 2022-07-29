<template>
  <div class="support-options-card br-big pa-8">
    <h4>Opciones de soporte</h4>
    <v-divider class="my-5"></v-divider>
    <v-row>
      <v-col cols="12" sm="4" class="text-center">
        <v-icon class="mb-2" style="color: green;">mdi-whatsapp</v-icon>
        <p class="text-center mb-0">Whatsapp</p>
        <a class="ts-small tc-text-light" href="https://wa.link/rx2j6z">(612) 104 9341</a>
      </v-col>
      <v-col cols="12" sm="4" class="text-center">
        <v-icon class="mb-2 tc-primary">mdi-email</v-icon>
        <p class="text-center mb-0">Email</p>
        <a class="ts-small tc-text-light" href="mailto:coderabcs@gmail.com?subject=Soporte%20Formtyper">coderabcs@gmail.com</a>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "SupportOptions",
}
</script>

<style lang="scss" scoped>
.support-options-card {
  width: 100%;
  height: fit-content;
  background-color: var(--color-white);
  box-shadow: var(--bs-light);
}
</style>