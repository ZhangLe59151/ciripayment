<template>
  <div class="daily-fortune-result">
    <app-fortune-header></app-fortune-header>
    <div class="top-desc">
      Here's your fortune today!
    </div>
    <app-fortune-result-content :fortuneResult="fortuneResult" :salesResult="salesResult"></app-fortune-result-content>
    <div class="bottom-box">
      <div class="bottom-desc">
        Come back tomorrow for your daily reading.
      </div>
      <van-button plain type="primary" class="return-btn" @click="backToHome">
        Return Home
      </van-button>
    </div>
  </div>
</template>

<script>
import AppFortuneResultContent from "../../components/fortune-telling/AppFortuneResultContent";
import AppFortuneHeader from "../../components/fortune-telling/AppFortuneHeader";
import { mapState } from "vuex";
export default {
  name: "DailyFortuneResult",
  components: { AppFortuneHeader, AppFortuneResultContent },
  data() {
    return {
      fortuneResult: "",
      salesResult: ""
    }
  },
  computed: {
    ...mapState({
      fortunetellingFrame: "fortunetellingFrame",
      localDateFormatter: "localDateFormatter"
    }),
    today() {
      return this.$moment().format(this.localDateFormatter);
    }
  },
  methods: {
    backToHome() {
      this.$router.push({ name: "Home" })
    }
  },
  mounted() {
    let savedResult = this.fortunetellingFrame[this.today];
    let salesTarget = savedResult.salesTarget;
    this.fortuneResult = savedResult.fortuneResult;
    if (salesTarget.type === 0) {
      let currency = "฿";
      this.salesResult = salesTarget.incomeResult.min + currency + " ~ " + salesTarget.incomeResult.max + currency;
    } else {
      this.salesResult = salesTarget.generalResult;
    }
  }
}
</script>

<style lang="scss" scoped>
  .daily-fortune-result {
    position: relative;
    height: 100vh;
    width: 100%;
    background-color: #FF8600;
  }
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
</style>
