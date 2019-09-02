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
      @click="$router.push({name: 'LoginPage', query: {to: 'Settings'}})"
    >{{$t("Setting.SoL")}}</div>
    <settings-app-setting-list />
    <div
      v-if="isLogin"
      class="logout"
      @click="handleLogout"
    >{{$t("Setting.Logout")}}</div>
    <div class="version">
      {{$t("Setting.Version")}} 1.0
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
      this.$api.logout({}).then(res => {
        if (res.data.code === 200) {
          this.$toast("Logout success");
          this.$store.commit("logOut");
          this.$router.push({ name: "LandingPage" });
        } else {
          this.$toast("Logout failed");
        }
      });
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
