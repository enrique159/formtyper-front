<template>
  <div class="settings-view">
    <v-container>
      <h2>Configuración</h2>
    </v-container>
    <div class="centered-div">
      <h4 class="tc-text-light">Módulo en construcción</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsView',
  metaInfo: { title: 'Configuración' },
}
</script>

<style lang="scss" scoped>
.settings-view {
  width: 100%;
  height: 100%;
}

.centered-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}
</style>