<template>
  <div class="support-view animation-fade-left">
    <v-container>
      <h2>Soporte</h2>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-navigation-drawer width="180" floating permanent class="bg-transparent">
            <v-list dense rounded>
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="tc-primary ts-h3">Home</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "SupportView",
  metaInfo: { title: "Soporte" },
};
</script>

<style lang="scss" scoped>
.support-view {
  width: 100%;
  height: 100%;
}
</style>