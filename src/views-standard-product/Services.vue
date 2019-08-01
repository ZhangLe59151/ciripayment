<template>
  <div class="app-service">
    <app-services-header :applicationStatus="applicationStatus" ></app-services-header>
    <app-home-apply
      v-if="applicationStatus === '2'"
      :class="appPosition"
    />
    <div class="app-service-content">
      <app-service-content-settlement />
      <app-service-content-channels />
    </div>

    <app-tab-bar :active="2" />

  </div>
</template>

<script>
import AppTabBar from "@/components/AppTabBar";
import AppHomeApply from "@/components/AppHomeApply";
import AppServicesHeader from "@/components/AppServicesHeader";
import AppServiceContentSettlement from "@/components/AppServiceContentSettlement";
import AppServiceContentChannels from "@/components/AppServiceContentChannels";
export default {
  name: "Services",
  components: {
    AppServicesHeader,
    AppTabBar,
    AppHomeApply,
    AppServiceContentSettlement,
    AppServiceContentChannels
  },
  data() {
    return {
      settlementType: "0",
      applicationStatus: "1"
    };
  },
  methods: {
    fetchData() {
      // this.$api.check
    }
  },
  computed: {
    appPosition() {
      if (this.$store.state.deviceType !== "APP") {
        return "app-position-web";
      }
      return "app-position"
    }
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
      top:-75px;
    }

    .app-position-web {
      position: relative;
      top: -60px;
    }
  }
</style>
