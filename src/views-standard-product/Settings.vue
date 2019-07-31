<template>
  <div class="app-setting">
    <app-setting-header></app-setting-header>
    <app-setting-list></app-setting-list>
    <div class="logout">
      <el-link type="primary">Log Out</el-link>
    </div>
    <div class="version">
      version 1.1.0
    </div>
    <app-tab-bar v-bind:activeMenu="3"></app-tab-bar>
  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppSettingHeader from "@/components/AppSettingHeader";
import AppSettingList from "@/components/AppSettingList";
export default {
  name: "AppHome",

  components: {
    AppTabBar,
    AppSettingHeader,
    AppSettingList
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .app-setting {
    background-color: #f0f7fb;
    min-height: 100vh;
    position: relative;

    .logout {
      width: 100%;
      margin-top: 30px;
      text-align: center;
    }

    .version {
      font-size: 14px;
      color: #C2C8CC;
      position: absolute;
      bottom: 80px;
      width: 100%;
      text-align: center;
    }
  }
</style>
