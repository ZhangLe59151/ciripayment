<template>
  <div class="app-home">
    <app-home-header @ShowPopup="ShowPopup"></app-home-header>
    <app-home-balance></app-home-balance>
    <app-home-progress status="0" />
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
      popupStatus: false
    };
  },
  methods: {
    ShowPopup() {
      this.popupStatus = true;
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
}
</style>

