<template>
  <div class="daily-fortune-result">
    <fortune-telling-app-fortune-header />
    <div class="top-desc">
      Here's your fortune today!
    </div>
    <fortune-telling-app-fortune-result-content
      :fortuneResult="fortuneResult"
      :salesResult="salesResult"
    />
    <div class="bottom-box">
      <div class="bottom-desc">
        Come back tomorrow for your daily reading.
      </div>
      <van-button
        plain
        type="primary"
        class="return-btn"
        @click="$router.push({ name: 'Home' })"
      >
        Return Home
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DailyFortuneResult",
  data() {
    return {
      fortuneResult: "",
      salesResult: ""
    };
  },
  computed: {
    ...mapState({
      fortunetellingFrame: "fortunetellingFrame",
      localDateFormatter: "localDateFormatter",
      currency: "currency"
    }),
    today() {
      return this.$moment().format(this.localDateFormatter);
    }
  },
  mounted() {
    let savedResult = this.fortunetellingFrame[this.today];
    let salesTarget = savedResult.salesTarget;
    this.fortuneResult = savedResult.fortuneResult;

    this.salesResult =
      salesTarget.type === 0
        ? (this.salesResult = "".concat(
            salesTarget.incomeResult.min,
            this.currency,
            " ~ ",
            salesTarget.incomeResult.max,
            this.currency
          ))
        : salesTarget.generalResult;
  }
};
</script>

<style lang="scss" scoped>
.daily-fortune-result {
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: #ff8600;
  .top-desc {
    position: absolute;
    width: 100%;
    height: 24px;
    color: white;
    font-size: 16px;
    text-align: center;
  }
  .app-fortune-result-content {
    margin-top: 50px;
  }
  .bottom-box {
    position: absolute;
    left: 16px;
    right: 16px;
    height: 70px;
    bottom: 20px;
    .bottom-desc {
      position: absolute;
      width: 100%;
      height: 24px;
      top: 0;
      font-size: 14px;
      color: white;
      text-align: center;
    }
    .return-btn {
      position: absolute;
      background-color: transparent;
      border-style: solid;
      border-color: white;
      width: 100%;
      height: 40px;
      color: white;
      bottom: 0;
    }
  }
}
</style>
