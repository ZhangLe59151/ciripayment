<template>
  <div class="app-setting-profile-progress">
    <div class="regular-progress">
      <img :src="progress.icon">

      <div class="status">
        <div class="title">{{progress.label}}</div>
        <div class="des">{{progress.des}}</div>
      </div>
      <van-button
        class="bottom-btn-boxed update-button"
        @click="handleUpdateNow"
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
          des:
            "Once you have done so, you will be able to enable payment services such as Alipay, Promptpay and Visa.",
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
    };
  },
  computed: {
    progress() {
      return find(this.list, { status: this.status });
    }
  },
  methods: {
    handleUpdateNow() {
      this.$router.push({ name: "EnterInfo" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/bottom-btn.scss";
.app-setting-profile-progress {
  position: relative;
  top: -80px;
  overflow: hidden;
  height: 100vh;

  .regular-progress {
    min-height: 88px;
    margin: 16px;
    width: calc(100% - 52px);
    background-color: #ffffff;
    position: relative;
    border-radius: 4px;
    box-shadow: 0 2px 8px -4px rgba(4, 43, 68, 0.2);
    padding: 10px;
  }

  img {
    width: 54px;
    height: 54px;
    margin: 18px 18px 0 12px;
    position: absolute;
    top: 0;
  }
  .close-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #929292;
  }

  .status {
    display: inline-block;
    width: calc(100% - 100px);
    position: relative;
    left: 90px;
    top: 10px;
    .title {
      font-size: 16px;
      color: #FF8600;
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
