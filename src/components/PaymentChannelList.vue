<template>
  <van-dialog
    v-model="dialog"
    scroll=paper
    class="scroll-dialog"
    :show-confirm-button="false"
  >

    <van-row class="heading">
      <van-col span="20">
        <h1>Payment Channel Details</h1>
      </van-col>
      <van-col span="1" offset="3">
        <van-icon
        name="cross"
        color="#929292"
        @click="closeDialog"
      />
      </van-col>
    </van-row>
    <div
      v-for="item in paymentChannelList"
      :key="item.id"
      class="box-popup"
    >
      <div class="popup-title">
        <img :src="item.img">
        <div class="img-label">{{item.label}}</div>
      </div>
      <div class="popup-desc">
        <el-row>
          <el-col :span="12">
            <div class="left-desc">Service Fee </div>
          </el-col>
          <el-col :span="12">
            <div class="right-desc">0.1 – 0.3%</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="left-desc">Settlement Date</div>
          </el-col>
          <el-col
            :span="12"
          >
            <div class="right-desc">1 – 3 days</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </van-dialog>

</template>

<script>
export default {
  name: "PaymentChannelList",
  props: {
    paymentChannelList: Array,
    dialog: Boolean
  },
  methods: {
    closeDialog() {
      this.$emit("update:dialog", false)
    }

  }
}
</script>

<style lang="scss" scoped>
  .scroll-dialog {
    height: 80vh;
    padding: 10px 20px;
    overflow: scroll;
  }
  .heading {
    h1{
      font-size: 24px;
      color: #2F3941;
      font-weight: bold;
    }
  }
  .box-popup {
    padding: 0;
    margin: 20px 0px 10px;
    line-height: 50px;
    position: relative;
    background: #ffffff;
    border: #d8dee6 1px solid;
    box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    .popup-title {
      align-items: flex-start;
      border-bottom: 20px;
      padding: 10px 0;
      img {
        height: 40px;
        vertical-align: middle;
        top: 16px;
        margin-left: 5px;
      }

      .img-label {
        font-size: 16px;
        line-height: 22px;
        display: inline-block;
        margin-left: 10px;
      }
    }
    .popup-desc {
      font-size: 14px;
      line-height: 22px;
      background: #F2F2F2;
      padding: 10px 15px;
      margin: 1px;
      .left-desc {
        text-align: left;
        font-weight: bold;
      }
      .right-desc {
        text-align: right;
      }
    }
  }
</style>
