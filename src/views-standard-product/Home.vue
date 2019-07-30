<template>
  <div class="app-home">
    <app-home-header @ShowPopup="ShowPopup"></app-home-header>
    <app-home-balance :settlementType="settlementType"></app-home-balance>
    <app-home-progress
      status="0"
      :class="appPosition"
    />
    <app-tab-bar></app-tab-bar>
    <van-popup
      v-model="popupStatus"
      position="left"
      duration="0.1"
    >
      <app-home-apply />
    </van-popup>

  </div>
</template>


<script>
import AppTabBar from "@/components/AppTabBar";
import AppHomeHeader from "@/components/AppHomeHeader";
import AppHomeBalance from "@/components/AppHomeBalance";
import AppHomeProgress from "@/components/AppHomeProgress";
import AppHomeApply from "@/components/AppHomeApply";

export default {
  name: "AppHome",

  components: {
    AppTabBar,
    AppHomeHeader,
    AppHomeBalance,
    AppHomeProgress,
    AppHomeApply
  },
  data() {
    return {
      popupStatus: false,
      settlementType: "0"
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
  .van-popup {
    width: 90%;
    position: relative;
    left: 5%;
  }

  .app-position {
    margin-top: 78px;
  }

  .app-position-auto-settlement {
    margin-top: 98px;
  }
}
</style>

