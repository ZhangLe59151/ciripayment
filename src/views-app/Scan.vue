<template>
  <div class="app-qrcode">
    <van-nav-bar
      title=""
      left-text="Collect Payment"
      left-arrow
      @click-left="$router.back()"
      :z-index="3000"
    >
      <i
        class="iconfont iconscan"
        slot="right"
      />
    </van-nav-bar>
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
import AppHomeApply from "@/components/AppHomeApply";

export default {
  components: {
    AppHomeApply
  },
  data() {
    return {
      popupStatus: true
    };
  }
};
</script>

<style lang="scss" scoped>
.app-qrcode {
  .van-popup {
    width: 90%;
    left: 5%;
  }

  .iconscan {
    color: #fff;
  }
}
</style>
