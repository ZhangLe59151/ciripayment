<template>
  <div class="app-profile-progress">

    <div
      class="regular-progress"
      v-if="status !== '2'"
    >
      <img :src="progress.icon">
      <!-- <van-icon
        name="cross"
        class="close-icon"
        @click="handleClose"
      /> -->
      <div class="status">
        <div class="title">{{progress.label}}</div>
        <div class="des">{{progress.des}}</div>
      </div>
    </div>
  </div>

</template>

<script>
import { find } from "lodash";

export default {
  name: "AppProfileProgress",

  components: {},

  props: {
    status: {
      default: "0",
      required: true,
      type: String
    }
  },

  data() {
    return {
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
      return find(this.list, { status: this.status });
    }
  },

  methods: {
    handleClose() {}
  }
};
</script>

<style lang="scss" scoped>
.app-profile-progress {
  position: relative;
  top: -64px;

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
}
</style>

