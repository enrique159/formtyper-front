<template>
  <div class="stats-view animation-fade-left">
    <v-container>
      <h2>Estadisticas</h2>
    </v-container>
    <div class="centered-div">
      <h4 class="tc-text-light">Módulo en construcción</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsView',
  metaInfo: { title: 'Estadisticas' },
}
</script>

<style lang="scss" scoped>
.stats-view{
  width: 100%;
  height: 100%;
}

.centered-div{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
}
</style>