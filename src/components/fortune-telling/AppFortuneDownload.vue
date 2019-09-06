<template>
  <div
    class="web-download"
    v-if="showDownloadIcon"
  >
    <img :src="require('@/assets/imgs/fortune-telling/download_icon.png')">
    <div>
      <div>{{$t("FortuneTelling.downloadDes")}}</div>
      <img :src="require('@/assets/imgs/google.png')">
    </div>
    <van-icon
      name="cross"
      @click="$store.commit('UpdateDownloadIcon')"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      showDownloadIcon: "showDownloadIcon"
    })
  }
};
</script>

<style lang="scss" scoped>
.web-download {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 84px;
  background: rgba(47, 57, 65, 0.9);

  > img {
    height: 60px;
    width: 60px;
    margin: 12px 20px;
  }

  > div {
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 16px;
    display: inline-block;
    width: 220px;
    position: relative;
    top: -45px;
    > img {
      height: 20px;
      width: 64px;
      position: absolute;
      bottom: -28px;
    }
  }

  .van-icon-cross {
    font-size: 20px;
    position: absolute;
    top: 12px;
    right: 16px;
    color: #ffffff;
  }
}
</style>
