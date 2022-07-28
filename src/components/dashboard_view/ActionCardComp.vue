<template>
  <div class="action-card br-big pa-3" :class="`background-${color}`" @click="onClick()">
    <v-icon>mdi-{{ info.icon }}</v-icon>
    <div>
      <h3 class="mb-0 tc-white">{{ info.title}}</h3>
      <span class="ts-smaller tc-white">{{ info.subtitle }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionCardComp',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    info: {
      type: Object,
      default: () => ({})
    },
    action: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onClick() {
      this.action()
    }
  }
}
</script>

<style lang="scss" scoped>
.action-card {
  width: 100%;
  height: 128px;
  box-shadow: var(--bs-normal);
  color: var(--color-white) !important;
  transition: var(--transition-normal);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  i { color: rgb(255, 255, 255) !important; }
  &:hover {
    transform: scale(0.98);
    box-shadow: var(--bs-dark);
  }
}

.background-primary {
  background-color: var(--color-primary);
}

.background-blue {
  background: linear-gradient(to right top, #008fff, #00acff, #00c4ff, #00d9ef, #12ebd9);
}

.background-orange {
  background: linear-gradient(to right top, #ff7b3e, #ff725a, #ff6e73, #f76e89, #ea729c);
}
</style>