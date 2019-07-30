<template>
  <div class="app-home">
    <app-home-header></app-home-header>
    <app-home-balance></app-home-balance>
    <app-home-progress status="0" />
    <app-tab-bar></app-tab-bar>

  </div>
</template>


<script>
import AppTabBar from "@/components/AppTabBar";
import AppHomeHeader from "@/components/AppHomeHeader";
import AppHomeBalance from "@/components/AppHomeBalance";
import AppHomeProgress from "@/components/AppHomeProgress";
export default {
  name: "AppHome",

  components: {
    AppTabBar,
    AppHomeHeader,
    AppHomeBalance,
    AppHomeProgress
  }
};
</script>

<style lang="scss" scoped>
.app-home {
  background-color: #f0f7fb;
  min-height: 100vh;
  position: relative;
}
</style>

