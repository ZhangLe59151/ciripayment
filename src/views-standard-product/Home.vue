<template>
  <div class="app-home">
    <app-home-header @ShowPopup="ShowPopup"></app-home-header>
    <app-home-balance :settlementType="settlementType"></app-home-balance>
    <app-home-progress
      :status="applicationStatus"
      :class="appPosition"
    />
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
  },
  data() {
    return {
      settlementType: "0",
      applicationStatus: "0"
    };
  },
  methods: {
    ShowPopup() {
      this.popupStatus = true;
    }
  },
  computed: {
    appPosition() {
      return this.settlementType === "1"
        ? "app-position-auto-settlement"
        : "app-position";
    }
  }
};
</script>

<style lang="scss" scoped>
.app-home {
  background-color: #f0f7fb;
  min-height: 100vh;
  position: relative;

  .app-position {
    margin-top: 78px;
  }

  .app-position-auto-settlement {
    margin-top: 98px;
  }
}
</style>

