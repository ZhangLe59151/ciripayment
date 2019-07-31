<template>
  <div class="app-setting-profile-progress">
    <div
      class="regular-progress"
      v-if="status !== '2'"
    >
      <img :src="progress.icon">
      <van-icon
        name="cross"
        class="close-icon"
        @click="handleClose"
      />
      <div class="status">
        <div class="title">{{progress.label}}</div>
        <div class="des">{{progress.des}}</div>
      </div>
      <van-button
        class="bottom-btn-boxed update-button"
        @click="handleVerify"
        v-if="progress.status === '0'"
      >
        Update Now
      </van-button>
    </div>
  </div>
</template>

<script>
import { find } from "lodash";
export default {
  name: "AppSettingProfileProgress",

  props: {
    status: {
      default: "1",
      required: true,
      type: String
    }
  },

  data() {
    return {
      list: [
        {
          label: "Update Your Profile",
          des: "Once you have done so, you will be able to enable payment services such as Alipay, Promptpay and Visa.",
          status: "0",
          icon: require("@/assets/imgs/profile-01.png")
        },
        {
          label: "Verification In Progress",
          des: "We’ll notify you when we’re done verifying.",
          status: "1",
          icon: require("@/assets/imgs/profile-02.png")
        }
      ]
    }
  },
  computed: {
    progress() {
      return find(this.list, { status: this.status });
    }
  },
  methods: {
    handleClose() {

    },
    handleVerify() {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/css/bottom-btn.scss";
  .app-setting-profile-progress {
    position: relative;

    .regular-progress {
      min-height: 88px;
      margin: 16px;
      width: calc(100% - 32px);
      background-color: #ffffff;
      position: relative;
      border-radius: 4px;
      box-shadow: 0 2px 8px -4px rgba(4, 43, 68, 0.2);
    }

    img {
      width: 54px;
      height: 54px;
      margin: 18px 18px 0 12px;
    }
    .close-icon {
      position: absolute;
      right: 5px;
      top: 5px;
      color: #929292;
    }

    .status {
      display: inline-block;
      width: 230px;
      .title {
        font-size: 16px;
        color: #053c5e;
        letter-spacing: 0;
        font-weight: bold;
        position: relative;
        top: -5px;
      }

      .des {
        font-size: 14px;
        color: #2f3941;
        letter-spacing: 0;
      }
    }

    .update-button {
      left: 5%;
      width: 90%;
      margin-bottom: 15px;
    }

  }

</style>
