<template>
  <div class="app-fortune-header">
    <div class="title">{{title}}</div>
    <van-icon
      name="arrow-left"
      class="arrow-left"
      @click="$router.back()"
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

Vue.use(Dialog);

export default {
  props: {
    title: {
      default: ""
    },
    showRightIcon: {
      default: true
    },
    showLeftIcon: {
      default: false
    }
  },
  computed: {
    ...mapState({
      fortuneInfo: "fortuneInfo"
    })
  },
  methods: {
    returnHome() {
      if (this.fortuneInfo.fortuneResult !== null) {
        this.$router.push({ name: "Home" });
      } else {
        Dialog.confirm({
          title: "Leaving Master" + this.fortuneInfo.selectedMaster.name + "?",
          message:
            this.$t("Furtune.poorMaster") +
            this.fortuneInfo.selectedMaster.name +
            this.$t("Furtune.leaveMessage")
        })
          .then(() => {
            // on confirm
            this.$router.push({ name: "Home" });
          })
          .catch(() => {
            // on cancel
          });
      }
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
