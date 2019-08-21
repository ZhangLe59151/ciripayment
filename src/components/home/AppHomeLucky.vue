<template>
  <router-link
    class="app-home-lucky"
    tag="div"
    :to="{name: 'DailyFortunePrepare'}"
    v-if="!fortuneTold"
  >
    <img :src="require('@/assets/imgs/home_master.png')">
    <!-- <div class="title">{{luckTitle}}</div> -->
    <div class="subtitle">
      <div>{{luckTitle}}</div>
      <div>{{subtitle}}</div>
    </div>
    <div class="btn">{{$t("Home.luckyBtn")}}</div>
  </router-link>
  <router-link
    class="app-home-lucky"
    tag="div"
    :to="{name: 'DailyFortuneResult'}"
    v-else
  >
    <img
      :src="require('@/assets/imgs/master_01.png')"
      class="single"
    >
    <div class="title">{{encourageLuckyTitle}}</div>
    <div class="subtitle">
      <div v-if="inputedIncome">{{incomeMin}}<span class="subscript">{{currency}}</span> ~ {{incomeMax}}<span class="subscript">{{currency}}</span></div>
      <div v-else>{{subtitle}}</div>
    </div>
    <div class="encourage">{{encourageWording}}</div>
  </router-link>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppHomeLucky",
  data() {
    return {
      fortuneTold: false,
      luckTitle: this.$t("Home.luckyTitle"),
      subtitle: this.$t("Home.luckySubtitle"),
      encourageLuckyTitle: this.$t("Home.encourageLuckyTitle"),
      encourageWording: this.$t("Home.encourageWording"),
      inputedIncome: false,
      incomeMin: 0,
      incomeMax: 0,
      currency: this.$t("Home.currency")
    };
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
  mounted() {
    let todayFortune = this.fortunetellingFrame[this.today]
      ? this.fortunetellingFrame[this.today]
      : "";
    if (todayFortune) {
      this.fortuneTold = true;
      let salesTarget = todayFortune.salesTarget;
      if (salesTarget.type === 0) {
        this.inputedIncome = true;
        this.incomeMin = (salesTarget.incomeResult.min + "").replace(
          /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
          "$&,"
        );
        this.incomeMax = (salesTarget.incomeResult.max + "").replace(
          /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
          "$&,"
        );
      } else {
        this.inputedIncome = false;
        this.subtitle = salesTarget.generalResult;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-home-lucky {
  height: 125px;
  width: 100%;
  background-image: url(../../assets/imgs/home_master_bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: right;
  margin: 8px 0;
  position: relative;

  > img {
    height: 120px;
    position: absolute;
    left: 0;
    bottom: -7px;

    &.single {
      left: 20px;
    }
  }
  > div {
    &.title {
      font-size: 14px;
      color: #ffffff;
      position: absolute;
      top: 20px;
      right: 16px;
    }

    &.subtitle {
      font-weight: bold;
      font-size: 22px;
      color: #ffffff;
      position: absolute;
      top: 16px;
      right: 16px;
    }
    &.encourage {
      font-size: 14px;
      color: #ffffff;
      position: absolute;
      bottom: 30px;
      right: 16px;
    }
    &.btn {
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      font-size: 14px;
      color: #2f3941;
      text-align: center;
      line-height: 20px;
      width: 90px;
      height: 32px;
      line-height: 32px;
      position: absolute;
      right: 16px;
      bottom: 20px;
    }
  }
  .subscript {
    font-size: 12px;
    font-weight: bold;
    color: #ffffff;
    vertical-align: top;
    padding-left: 4px;
  }
}
</style>
