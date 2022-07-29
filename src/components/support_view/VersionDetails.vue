<template>
  <div class="version-details-card br-big pa-8">
    <h4 class="tw-medium">Version {{ currentVersion.version }}</h4>
    <span class="ts-smaller tc-text-light">Fecha lanzamiento: {{ currentVersion.date }}</span>
    <v-divider class="my-5"></v-divider>
    <p class="ts-small tc-black tw-medium"> 
      {{ currentVersion.description }}
    </p>

    <h5 class="mb-2">Principales</h5>
    <ul class="details-list mb-8">
      <li v-for="(item, index) in currentVersion.details" :key="index">
        {{ item }}
      </li>
    </ul>

    <h5 class="mb-2">Otros</h5>
    <ul class="details-list mb-8">
      <li v-for="(item, index) in currentVersion.minorDetails" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { currentVersion } from '@/common/versionsListDetails.js'
export default {
  name: 'VersionDetails',
  data() {
    return {
      currentVersion: currentVersion,
    }
  },
}
</script>

<style lang="scss" scoped>
.version-details-card {
  width: 100%;
  height: fit-content;
  background-color: var(--color-white);
  box-shadow: var(--bs-light);
}

.details-list {
  list-style: circle;
  li {
    color: var(--color-text-dark);
    font-weight: var(--font-regular);
    font-size: var(--small-font-size);
  }
}
</style>