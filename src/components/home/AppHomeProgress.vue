<template>
  <div class="app-home-progress">
    <home-app-home-apply
      v-if="status === 'NOAPPLICATION' || status === '2'"
      :status.sync="status"
    />

    <transition name="van-slide-up">
      <div
        class="regular-progress"
        v-if="status !== 'NOAPPLICATION' && status !== '2' && showBox"
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
      </div>
    </transition>
  </div>

</template>

<script>
import { find } from "lodash";

export default {
  name: "AppHomeProgress",

  props: {
    status: {
      default: "NOAPPLICATION",
      required: true,
      type: String
    }
  },

  data() {
    return {
      showBox: true,
      list: [
        {
          label: "Payment Service Enabled",
          des: "Start using collecting payments via QR instantly.",
          status: "1",
          icon: require("@/assets/imgs/money-01.png")
        },
        {
          label: "Verification In Progress",
          des: "We’ll notify you when we’re done verifying.",
          status: "0",
          icon: require("@/assets/imgs/money-00.png")
        }
      ]
    };
  },

  computed: {
    progress() {
      const item = find(this.list, { status: this.status });
      return item
        ? item
        : {
            label: "",
            des: "",
            icon: ""
          };
    }
  },

  methods: {
    handleClose() {
      this.showBox = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-home-progress {
  position: relative;

  .regular-progress {
    height: 88px;
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
      color: #ff8600;
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
}
</style>
