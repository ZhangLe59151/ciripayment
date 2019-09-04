<template>
  <div class="master-profile">
    <fortune-telling-app-fortune-header
      :showLeftIcon="true"
      :showRightIcon="false"
      :showTitle="$t('Fortune.masterProfile')"
    />
    <div class="cnt">
      <img :src="imgList[info.id]">
      <div class="name">{{info.name}}</div>
      <div class="subtitle">{{$route.query.subtitle}}</div>
      <div class="detail">{{$t(`FortuneTelling.masterDetail${info.id}`)}}</div>
      <div
        class="bottom-btn"
        @click="handleClick"
      > {{$t("FortuneTelling.tellMyFortune")}}</div>
    </div>
  </div>
</template>

<script>
import { find } from "lodash";
import { mapState } from "vuex";
export default {
  name: "MasterProfile",
  data() {
    return {
      imgList: {
        "1": require("@/assets/imgs/fortune-telling/master_01.png"),
        "2": require("@/assets/imgs/fortune-telling/master_02.png")
      }
    };
  },
  computed: {
    ...mapState({
      info(state) {
        const item = find(state.masterList, { id: +this.$route.params.id });
        return item;
      },
      fortuneInfo: "fortuneInfo"
    })
  },
  methods: {
    handleClick() {
      this.$router.push({ name: "DailyFortuneQuestion", params: { id: 1 } });
    }
  }
};
</script>

<style lang="scss" scoped>
.master-profile {
  position: relative;
  height: 100vh;
  min-height: 510px;
  width: 100vw;
  background: no-repeat center
    url("../../assets/imgs/fortune-telling/fortune_telling_bg.png");
  background-size: cover;

  .cnt {
    background: no-repeat center
      url("../../assets/imgs/fortune-telling/master_profile_bg.png");
    background-size: 100% 100%;
    width: 100%;
    height: calc(100vh - 120px);
    min-height: 510px;
    position: relative;
    text-align: center;
    img {
      width: 110px;
      height: 160px;
      margin-top: 30px;
    }

    .name {
      margin: 16px auto 12px;
      font-size: 20px;
      color: #2f3941;
    }

    .subtitle {
      font-size: 12px;
      color: #68737d;
    }

    .detail {
      font-size: 14px;
      color: #2f3941;
      margin: 20px 40px;
      text-align: left;
      letter-spacing: 0;
      line-height: 18px;
    }

    .bottom-btn {
      background-color: #ffa702;
      color: #ffffff;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      width: calc(100vw - 92px);
      border-radius: 4px;
      margin: 10px 46px 0 46px;
    }
  }
}
</style>
