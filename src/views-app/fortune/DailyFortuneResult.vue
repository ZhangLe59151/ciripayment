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
  background: no-repeat center url("../../assets/imgs/fortune-telling/fortune_telling_bg.png");
  background-size: cover;
  .top-desc {
    position: absolute;
    width: 100%;
    height: 24px;
    color: white;
    font-size: 16px;
    text-align: center;
  }
  .app-fortune-result-content {
    margin-top: 20px;
  }
}
</style>
