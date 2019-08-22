<template>
  <div
    class="app-home-lucky"
    @click="gotoOuterLink(BaseWebUrl + '#/daily-fortune-prepare')"
    v-if="!fortuneTold"
  >
    <img :src="require('@/assets/imgs/home_master.png')">
    <div class="subtitle">
      <div>{{$t("Home.luckyTitle")}}</div>
      <div>{{$t("Home.luckySubtitle")}}</div>
    </div>
    <div class="btn">{{$t("Home.luckyBtn")}}</div>
  </div>
  <div
    class="app-home-lucky"
    @click="gotoOuterLink(BaseWebUrl + '#/daily-fortune-result?id=' + fortuneResult.id)"
    v-else
  >
    <img
      :src="imgUrl"
      class="single"
    >
    <div class="title">{{$t("Home.encourageLuckyTitle")}}</div>
    <div class="subtitle single-subtitle">
      <div v-if="inputedIncome">{{incomeMin}}<span class="subscript">{{$t("Home.currency")}}</span> ~ {{incomeMax}}<span class="subscript">{{$t("Home.currency")}}</span></div>
      <div v-else>{{$t("Home.luckySubtitle")}}</div>
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
      incomeMax: 0
    };
  },
  computed: {
    ...mapState({
      fortunetellingFrame: "fortunetellingFrame",
      localDateFormatter: "localDateFormatter",
      fortuneResult: state => state.fortuneInfo.fortuneResult,
      BaseWebUrl: "BaseWebUrl"
    }),
    today() {
      return this.$moment().format(this.localDateFormatter);
    },
    imgUrl() {
      const masterId = this.fortuneResult.masterId;
      const imgList = {
        "1": require(`@/assets/imgs/master_01.png`),
        "2": require(`@/assets/imgs/master_02.png`),
        "3": require(`@/assets/imgs/master_03.png`)
      };
      return imgList[masterId];
    }
  },

  watch: {
    fortuneResult: {
      handler(val, oldVal) {
        if (val.fortuneResult.length > 0) {
          this.fortuneTold = true;
          let salesTarget = val.salesTarget;
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
      },
      deep: true
    }
  },
  methods: {
    gotoOuterLink(url) {
      // window.location.href = url;
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

  > img {
    height: 120px;
    position: absolute;
    left: 0;
    bottom: -7px;

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
      font-size: 22px;
      color: #ffffff;
      position: absolute;
      top: 16px;
      right: 16px;
      &.single-subtitle {
        top: 44px;
      }
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
      padding: 6px 16px;
      position: absolute;
      right: 16px;
      bottom: 16px;
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
