<template>
  <div class="app-fortune-master-photo">
    <div class="photo-bg">
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
    }
  },
  computed: {
    ...mapState({
      currentMasterImage(state) {
        return `master-img-0${this.masterId}`;
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
    border-color: #bf3813;
    border-width: 1px;
    border-style: solid;
    overflow: hidden;
    .photo {
      width: 100%;
      height: 100%;
      background: no-repeat center url("../../assets/imgs/master_01.png");
      background-size: contain;
      &.master-img-02 {
        background-image: url("../../assets/imgs/master_02.png");
      }
      &.master-img-03 {
        background-image: url("../../assets/imgs/master_03.png");
      }
    }
  }
}
</style>
