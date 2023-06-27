<template>
  <div class="version-details-card br-big pa-8">
    <div v-for="(version, i) in versions" :key="version.version" class="mb-12">
      <h4 class="tw-medium">Version {{ version.version }} <span v-if="i == 0" class="tw-bold">(Actual)</span></h4>
      <span class="ts-smaller tc-text-light">Fecha lanzamiento: {{ version.date }}</span>
      <v-divider class="my-5"></v-divider>
      <p class="ts-small tc-black tw-medium"> 
        {{ version.description }}
      </p>
  
      <h5 class="mb-2">Principales</h5>
      <ul class="details-list mb-8">
        <li v-for="(item, index) in version.details" :key="`details-${index}`">
          {{ item }}
        </li>
      </ul>
  
      <h5 class="mb-2">Otros</h5>
      <ul class="details-list mb-8">
        <li v-for="(item, index) in version.minorDetails" :key="`minorDetails-${index}`">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { currentVersion } from '@/common/versionsListDetails.js'
import Versions from '@/common/versions.json'
export default {
  name: 'VersionDetails',
  data() {
    return {
      currentVersion: currentVersion,
      versions: Versions,
    }
  },
}
</script>

<style lang="scss" scoped>
.version-details-card {
  width: 100%;
  height: calc(100vh - 90px);
  background-color: var(--color-white);
  box-shadow: var(--bs-light);
  overflow-y: auto;
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