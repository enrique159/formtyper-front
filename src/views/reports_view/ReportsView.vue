<template>
  <div class="reports-view animation-fade-left">
    <v-container>
      <h2>Reportes</h2>
    </v-container>
    <div class="centered-div">
      <h4 class="tc-text-light">Módulo en construcción</h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ReportsView',
    metaInfo: { title: 'Reportes' },
  }
</script>

<style lang="scss" scoped>
.reports-view{
  height: 100%;
  width: 100%;
}

.centered-div{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}
</style>