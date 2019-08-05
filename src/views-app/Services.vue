<template>
  <div class="app-service">
    <app-service-header :applicationStatus="applicationStatus" ></app-service-header>
    <!-- TODO: only when there is no application, display the application form -->
    <app-home-apply
      v-if="applicationStatus === '2'"
      :class="appPosition"
    />
    <div v-else class="app-service-content">
      <app-service-content-settlement />
      <app-service-content-channels />
    </div>

    <app-tab-bar :active="($store.state.deviceType === 'APP' ? 2 : 1 )" />

  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppHomeApply from "@/components/AppHomeApply";
import AppHomeProgress from "@/components/AppHomeProgress";
import AppServiceHeader from "@/components/AppServiceHeader";
import AppServiceContentSettlement from "@/components/AppServiceContentSettlement";
import AppServiceContentChannels from "@/components/AppServiceContentChannels";
import { isEmpty } from "lodash";
export default {
  name: "Services",
  components: {
    AppServiceHeader,
    AppTabBar,
    AppHomeApply,
    AppHomeProgress,
    AppServiceContentSettlement,
    AppServiceContentChannels
  },
  data() {
    return {
      settlementType: "0",
      applicationStatus: isEmpty(this.$store.state.userInfo.applicationStatus) ? "0" : this.$store.state.userInfo.applicationStatus
    };
  },
  computed: {
    appPosition() {
      if (this.$store.state.deviceType !== "APP") {
        return "app-position-web";
      }
      return "app-position"
    }
  },
  created() {
    this.$store.commit("fetchDataFromLocal");
  }
}
</script>

<style lang="scss" scoped>
  .app-service {
    background-color: #ffffff;
    min-height: 100vh;
    position: relative;

    .app-position {
      position:relative;
      // top:-75px;
      top: 0px;
    }

    .app-position-web {
      position: relative;
      top: -60px;
    }
  }
</style>
