<template>
  <div class="app-home-apply">
    <img :src="require('@/assets/imgs/money-0.png')">
    <div class="status">
      <div class="title">{{progress.label}}</div>
      <div class="des">{{progress.des}}</div>
    </div>

    <div class="line"></div>

    <div class="require">
      <ul>
        <li>
          What's required:
        </li>
        <li>
          <i class="iconfont icondocument" />
          National ID
        </li>
        <li>
          <i class="iconfont icontime" />
          Approximately <strong>5 minutes</strong>
        </li>
      </ul>
      <van-button
        size="small"
        class="bottom-btn"
        @click="handleNext"
      >
        Apply Now
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: {
        label: "Apply For Payment Service",
        des:
          "Once your payment service is enabled, you will be able to start collecting payments via QR instantly."
      }
    };
  },
  methods: {
    handleNext() {
      this.$router.push({ name: "EnterInfo" });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-home-apply {
  padding: 12px;
  margin: 16px;
  width: calc(100% - 56px);
  background-color: #ffffff;
  box-shadow: 0 2px 8px -4px rgba(4, 43, 68, 0.2);
  border-radius: 4px;
  position: relative;

  img {
    width: 54px;
    height: 54px;
    margin: 18px 18px 0 12px;
    position: relative;
    top: -36px;
  }

  .status {
    display: inline-block;
    width: calc(100% - 90px);
    .title {
      font-size: 16px;
      color: #053c5e;
      letter-spacing: 0;
      font-weight: bold;
    }

    .des {
      font-size: 14px;
      color: #2f3941;
      letter-spacing: 0;
      position: relative;
      bottom: -5px;
      line-height: 20px;
    }
  }

  .line {
    height: 1px;
    background-color: #a0b4c0;
    margin: 16px 0 0 12px;
    width: calc(100% -12px);
  }

  .require {
    margin-left: 12px;

    ul {
      margin-top: 10px;
      li {
        font-size: 14px;
        color: #2f3941;
        letter-spacing: 0;
        line-height: 30px;
      }
    }

    .bottom-btn {
      width: 100%;
      margin: 10px 0;
    }
  }
}
</style>
