<template>
  <div class="app-setting">
    <app-common-header
      :hasLeftArrow="false"
      :leftFunc="function(){}"
      leftText="Settings"
    />
    <div
      v-if="isLogin === false"
      class="logout"
      @click="$router.push({name: 'LandingPage', query: {to: 'Settings'}})"
    >{{$t("Setting.SoL")}}</div>
    <settings-app-setting-list />
    <div
      v-if="isLogin"
      class="logout"
      @click="handleLogout"
    >{{$t("Setting.Logout")}}</div>
    <div class="version">
      {{$t("Setting.Version")}} 0.2
    </div>
    <app-tab-bar :active="(deviceType === 'APP' ? 2 : 2 )" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import util from "@/util";

export default {
  name: "AppSettings",
  data() {
    return {
      active: 3
    };
  },
  computed: {
    ...mapState({
      isLogin: "OTPVerified",
      deviceType: "deviceType"
    })
  },
  created() {},
  methods: {
    handleLogout() {
      this.$store.commit("logOut");
      this.$router.push({ name: "Home" });
    }
  }
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
    color: #037aff;
    letter-spacing: 0;
    line-height: 50px;
    height: 50px;
    background-color: #ffffff;
    font-size: 14px;
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
