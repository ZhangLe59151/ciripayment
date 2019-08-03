<template>
  <van-dialog
    v-model="dialog"
    scroll=paper
    class="select-payment-channel-dialog"
    show-confirm-button
    @confirm="closeDialog"
  >
      <el-checkbox-group
        v-model="checkList"
        text-color="#000000"
        fill="#409EFF"
        class="payment-channel-box"
      >
        <div
          v-for="item in paymentChannelList"
          :key="item.id"
          class="checkbox-box"
        >
          <img :src="item.img">
          <div>{{item.label}}</div>

          <el-checkbox
            :label="item.id"
            style="margin-left: 20%;padding: 10px 0;"
            class="channel-checkbox"
          >
          </el-checkbox>
        </div>

      </el-checkbox-group>
  </van-dialog>
</template>

<script>
export default {
  name: "SelectPaymentChannelDialog",
  props: {
    paymentChannelList: Array,
    dialog: Boolean
  },
  data() {
    return {
      checkList: ["1", "2", "3", "4", "5"]
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:dialog", false)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/css/bottom-btn.scss";
  .select-payment-channel-dialog {
    text-align: center;
    padding-bottom: 20px;

    .el-checkbox__label {
      display: none;
    }

    .payment-channel-box {
      margin: 20px;
      text-align: left;

      .checkbox-box {
        width: 80%;
        margin-left: 10%;
        margin-top: 10px;
        height: 50px;
        line-height: 50px;
        position: relative;
        background: #ffffff;
        border: 1px solid #d8dee6;
        box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.2);
        border-radius: 8px;

        > div {
          font-size: 12px;
          display: inline-block;
          margin-left: 60px;
        }

        .channel-checkbox {
          position: absolute;
          right: 10px;
          top: -8px;
        }

        img {
          width: 40px;
          position: absolute;
          top: 16px;
          margin-left: 10px;
        }
      }
    }

    .line {
      width: 60%;
      margin-left: 20%;
      height: 1px;
      background-color: #979797;
    }

    .description {
      font-size: 16px;
      color: #000000;
      letter-spacing: 0;
      text-align: center;
    }

    .close {
      text-align: right;
      padding: 10px 10px 0 0;
    }

    .title {
      font-size: 13px;
      padding: 0 20px;
      background-color: #053c5e;
      color: #d8d8d8;
      border: 1px solid #979797;
      vertical-align: middle;
      height: 48px;
      line-height: 48px;
    }

    .tips {
      font-size: 31px;
      padding: 54px 24px 30px;
    }

    .sign-tips {
      text-align: center;
      color: #000;
      font-size: 15px;
      margin-top: 30px;

      .login-link {
        display: block;
        color: #000;
        text-decoration: underline;
      }
    }

    .powered {
      width: 150px;
      height: 22px;
      margin: 50px auto 0;

      div {
        display: block;
        float: left;
        margin-left: 10px;
        height: 22px;
        color: #929292;
        font-size: 11px;
        line-height: 22px;
      }

      img {
        width: 22px;
        display: block;
        float: left;
      }
    }

  }
</style>

<style lang="scss">
  .select-payment-channel-dialog {
    .el-checkbox__label {
      display: none;
    }
  }
</style>
