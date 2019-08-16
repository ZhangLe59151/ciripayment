<template>
  <div class="app-setting">
    <app-common-header
      :hasLeftArrow="false"
      :leftFunc="function(){}"
      leftText="Settings"
    />
    <app-setting-list></app-setting-list>
    <div class="logout">
      <span @click="handleLogout">Log Out</span>
    </div>
    <div class="version">
      version 1.1.0
    </div>
    <app-tab-bar :active="($store.state.deviceType === 'APP' ? 2 : 2 )" />
  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppSettingHeader from "@/components/AppSettingHeader";
import AppCommonHeader from "@/components/AppCommonHeader";
import AppSettingList from "@/components/AppSettingList";
import util from "@/util";
export default {
  name: "AppSettings",

  components: {
    AppTabBar,
    AppSettingHeader,
    AppSettingList,
    AppCommonHeader
  },
  data() {
    return {
      active: 3
    };
  },
  methods: {
    handleLogout() {
      util.removeCookies("SSID");
      this.$store.commit("logOut");
      localStorage.clear();
      this.$router.push({ name: "LandingPage" });
    }
  },
  created() {}
};
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
    > span {
      font-size: 14px;
      color: #037aff;
      letter-spacing: 0;
      text-align: center;
      line-height: 24px;
    }
  }

  .version {
    font-size: 14px;
    color: #c2c8cc;
    position: absolute;
    bottom: 80px;
    width: 100%;
    text-align: center;
  }
}
</style>
