<template>
  <div
    class="app-home-lucky"
    @click="$router.push({name: 'DailyFortunePrepare'})"
    v-if="!fortuneTold"
    v-analytics="{event: 'Home_FortuneTellingBanner'}"
  >
    <img
      :src="require('@/assets/imgs/lady_teller.png')"
      class="lady_teller"
    >
    <div class="subtitle">
      <div>{{$t("Home.luckyTitle")}}</div>
      <div>{{$t("Home.luckySubtitle")}}</div>
    </div>
    <div class="btn">{{$t("Home.luckyBtn")}}</div>
    <img
      :src="require('@/assets/imgs/male_teller.png')"
      class="male_teller"
    >

  </div>
  <div
    class="app-home-lucky app-home-lucky-single"
    @click="$router.push({name: 'DailyFortuneResult',query: {id: fortuneResult.id}})"
    v-analytics="{event: 'Home_FortuneTellingBanner'}"
    v-else
  >
    <img
      :src="imgUrl"
      class="single"
    >
    <div class="title">{{$t("Home.encourageLuckyTitle")}}</div>
    <div class="subtitle single-subtitle">
      <div>{{subtitle}}</div>
      <div v-if="inputedIncome">
        {{incomeMin}}<span class="subscript">{{$t("Home.currency")}}</span>
        ~ {{incomeMax}}<span class="subscript">{{$t("Home.currency")}}</span></div>
    </div>
    <div class="encourage">{{$t("Home.encourageWording")}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppHomeLucky",
  data() {
    return {
      fortuneTold: false,
      inputedIncome: false,
      incomeMin: 0,
      incomeMax: 0,
      subtitle: ""
    };
  },
  computed: {
    ...mapState({
      fortunetellingFrame: "fortunetellingFrame",
      localDateFormatter: "localDateFormatter",
      fortuneResult: state => state.fortuneInfo.fortuneResult,
      deviceType: "deviceType"
    }),
    today() {
      return this.$moment().format(this.localDateFormatter);
    },
    imgUrl() {
      const masterId = this.fortuneResult.masterId;
      const imgList = {
        "1": require("@/assets/imgs/male_teller.png"),
        "2": require("@/assets/imgs/lady_teller.png")
      };
      return imgList[masterId];
    }
  },

  watch: {
    fortuneResult: {
      handler(val, oldVal) {
        if (val && val.fortuneResult && val.fortuneResult.length > 0) {
          this.fortuneTold = true;
          let salesTarget = val.salesTarget;
          if (salesTarget.incomeResult) {
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
          }
          this.subtitle = salesTarget.generalResult;
        }
      },
      deep: true
    }
  },
  methods: {
    gotoOuterLink(url) {
      // app
      // if (this.deviceType === "APP") {
      //   window.location.href = url;
      //   return false;
      // }
      // web
      this.$router.push(url.split("#")[1]);
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

  &.app-home-lucky-single {
    background-image: url(../../assets/imgs/home_master_bg_single.png);
  }

  > img {
    height: 100px;
    position: absolute;
    bottom: 0;

    &.lady_teller {
      left: 10px;
    }

    &.male_teller {
      right: 10px;
    }

    &.single {
      left: 20px;
      bottom: 0px;
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
      font-size: 16px;
      color: #ffffff;
      margin: 0 auto;
      padding: 24px 0 10px;
      width: 174px;
      text-align: center; // font-weight: bold;
      // font-size: 22px;
      // color: #ffffff;
      // position: absolute;
      // top: 16px;
      // right: 16px;
      &.single-subtitle {
        position: absolute;
        right: 16px;
        text-align: right;
        top: 15px;
        width: 200px;
        > div:first-child {
          margin: 2px 0;
        }
        > div:nth-child(2) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &.encourage {
      font-size: 14px;
      color: #ffffff;
      position: absolute;
      bottom: 20px;
      right: 16px;
    }
    &.btn {
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      font-size: 14px;
      color: #2f3941;
      text-align: center;
      padding: 6px 0;
      width: 70px;
      margin: 0 auto;
      // position: absolute;
      // right: 16px;
      // bottom: 16px;
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
