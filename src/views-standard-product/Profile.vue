<template>
  <div class="app-profile">
    <app-profile-header />
    <app-profile-content />
    <app-tab-bar :active="3" />

  </div>
</template>

<script>
import AppProfileHeader from "@/components/AppProfileHeader";
import AppProfileContent from "@/components/AppProfileContent";
import AppTabBar from "@/components/AppTabBar";

export default {
  components: {
    AppProfileHeader,
    AppProfileContent,
    AppTabBar
  }
};
</script>
