<template>
  <div class="app-fortune-header">
    <div class="title">{{ this.showTitle }}</div>
    <van-icon
      name="arrow-left"
      class="arrow-left"
      @click="letfFunc"
      v-if="showLeftIcon"
    />
    <van-icon
      name="cross"
      class="close"
      @click="returnHome"
      v-if="showRightIcon"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { Dialog } from "vant";
import router from "@/router";

Vue.use(Dialog);

export default {
  props: {
    title: {
      default: "Daily Fortune"
    },
    showRightIcon: {
      default: false
    },
    showLeftIcon: {
      default: false
    },
    letfFunc: {
      default() {
        router.back();
      },
      type: Function
    },
    showTitle: {
      default: ""
    }
  },
  computed: {
    ...mapState({
      fortuneInfo: "fortuneInfo"
    })
  },
  methods: {
    returnHome() {
      Dialog.confirm({
        title: this.$tc(
          "FortuneTelling.leaveMsgTitle",
          this.fortuneInfo.selectedMaster.name
        ),
        message:
          this.$t("Fortune.poorMaster") +
          this.fortuneInfo.selectedMaster.name +
          this.$t("Fortune.leaveMessage")
      })
        .then(() => {
          // on confirm
          this.$router.push({ name: "DailyFortunePrepare" });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-fortune-header {
  height: 70px;
  position: relative;

  .arrow-left {
    position: absolute;
    left: 16px;
    color: white;
    line-height: 70px;
    font-size: 20px;
  }
  .close {
    position: absolute;
    right: 16px;
    color: white;
    line-height: 70px;
    font-size: 20px;
  }
  .title {
    position: absolute;
    text-align: center;
    line-height: 70px;
    font-weight: bold;
    font-size: 24px;
    color: white;
    width: 100%;
  }
}
</style>
