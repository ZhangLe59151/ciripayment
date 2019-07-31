<template>
  <div class="app-setting">
    <app-setting-header></app-setting-header>
  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppSettingHeader from "@/components/AppSettingHeader";
import AppHomeBalance from "@/components/AppHomeBalance";
import AppHomeProgress from "@/components/AppHomeProgress";
import AppHomeDownload from "@/components/AppHomeDownload";
export default {
  name: "AppHome",

  components: {
    AppTabBar,
    AppSettingHeader,
    AppHomeBalance,
    AppHomeProgress,
    AppHomeDownload
  },
}
</script>
