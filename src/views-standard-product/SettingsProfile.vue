<template>
  <div class="app-setting-profile">
    <app-setting-profile-header></app-setting-profile-header>
    <app-setting-profile-progress
      :status="applicationStatus"
      :class="appPosition"
    ></app-setting-profile-progress>
  </div>
</template>

<script>
import AppSettingProfileHeader from "../components/AppSettingProfileHeader";
import AppSettingProfileProgress from "../components/AppSettingProfileProgress";
export default {
  name: "SettingsProfile",
  components: { AppSettingProfileProgress, AppSettingProfileHeader },
  data() {
    return {
      applicationStatus: "0"
    }
  },
  computed: {
    appPosition() {
      if (this.$store.state.deviceType !== "APP") {
        return "app-position-web";
      }
      return "app-position";
    }
  }

}
</script>

<style scoped>
.app-setting-profile {
  background-color: #f0f7fb;
  min-height: 100vh;
  position: relative;

  .app-position {
    margin-top: 78px;
  }

  .app-position-auto-settlement {
    margin-top: 98px;
  }

  .app-position-web {
    position: relative;
    top: -60px;
  }
}
</style>
