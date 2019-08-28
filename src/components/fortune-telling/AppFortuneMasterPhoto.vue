<template>
  <div class="app-fortune-master-photo">
    <div
      class="photo-bg"
      :style="imgStyle"
    >
      <div
        class="photo"
        :class="currentMasterImage"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppFortuneMaster",
  props: {
    masterId: {
      default() {
        return 1;
      },
      required: true,
      type: Number
    },
    imgSize: {
      default: 100,
      type: Number
    }
  },
  computed: {
    ...mapState({
      currentMasterImage(state) {
        return `master-img-0${this.masterId}`;
      },
      imgStyle() {
        const size = this.imgSize + "px";
        return {
          width: size,
          height: size
        };
      }
    })
  }
};
</script>

<style lang="scss" scoped>
.app-fortune-master-photo {
  margin-left: 16px;
  margin-right: 16px;
  .photo-bg {
    width: 100px;
    height: 100px;
    background: #f8f9f9;
    border-radius: 65px;
    overflow: hidden;
    .photo {
      width: 100%;
      height: 100%;
      background: no-repeat center
        url("../../assets/imgs/fortune-telling/ico_master_01.png");
      background-size: contain;
      &.master-img-02 {
        background-image: url("../../assets/imgs/fortune-telling/master_02.png");
      }
    }
  }
}
</style>
