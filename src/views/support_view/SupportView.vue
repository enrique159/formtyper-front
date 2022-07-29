<template>
  <div class="support-view animation-fade-left">
    <v-container>
      <h2>Ayuda y soporte</h2>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" sm="3">
          <v-list dense rounded class="bg-transparent">
            <v-list-item @click="select(0)">
              <v-list-item-content>
                <v-list-item-title class="ts-h3" :class="{ 'tt-underline': selected[0].active }">Soporte</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="select(1)">
              <v-list-item-content>
                <v-list-item-title class="ts-h3" :class="{ 'tt-underline': selected[1].active }">Actualización</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" sm="9">
          <SupportOptions v-if="selected[0].active" />
          <VersionDetails v-if="selected[1].active" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SupportOptions from '@/components/support_view/SupportOptions.vue'
import VersionDetails from "@/components/support_view/VersionDetails.vue";
export default {
  name: "SupportView",
  metaInfo: { title: "Soporte" },
  components: {
    SupportOptions,
    VersionDetails,
  },
  data() {
    return {
      selected: [
        { id: 0, text: "Soporte", active: true },
        { id: 1, text: "Actualización", active: false },
      ],
    }
  },
  methods: {
    select(id) {
      this.selected.forEach((item) => {
        item.active = item.id === id
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.support-view {
  width: 100%;
  height: 100%;
}
</style>