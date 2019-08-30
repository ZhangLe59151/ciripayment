<template>
  <div class="app-pick-date">
    <!-- <div class="pick_date">Today, 13 Aug 2019</div> -->
    <van-row class="select_date">
      <van-col span="12">Date</van-col>
      <van-col
        span="12"
        class="link_view_history"
      >View Record History</van-col>
    </van-row>
    <van-row class="pick_date">
      <van-col span="22">Today, 13 Aug 2019</van-col>
      <van-col span="2">
        <van-icon name="arrow-down" />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Vue from "vue";
import { Row, Col, Icon } from "vant";

Vue.use(Row)
  .use(Col)
  .use(Icon);

export default {
  name: "AppPickDate",
  props: {},
  methods: {
    handleClick() {
      this.$emit("ShowPopup");
    }
  }
};
</script>

<style lang="scss" scoped>
.app-pick-date {
  margin-top: 16px;
  margin-right: 16px;
  margin-left: 16px;
  height: 64px;
  position: relative;
  border-bottom: 1px solid #d7d7d7;

  .select_date {
    height: 20px;
    font-size: 14px;

    .link_view_history {
      font-size: 14px;
      color: #ffa702;
      text-align: right;
      height: auto;
      position: absolute;
      bottom: 0px;
      right: 0;
    }
  }

  .pick_date {
    top: 4px;
    height: 40px;
    font-size: 16px;
  }
}
</style>
