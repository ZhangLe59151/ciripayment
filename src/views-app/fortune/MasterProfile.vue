<template>
  <div class="master-profile">
    <fortune-telling-app-fortune-header
      :showLeftIcon="true"
      title="Master's Profile"
    />
    <div class="cnt">
      <img :src="imgList[info.id]">
      <div class="name">{{info.name}}</div>
      <div class="subtitle">{{$route.query.subtitle}}</div>
      <div class="detail">{{info.detail}}</div>
      <div
        class="btn"
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
      this.fortuneInfo.selectedMaster = this.$route.params.id;
      this.$store.commit("SaveFortuneInfo", this.fortuneInfo);
      this.$router.push({ name: "DailyFortuneQuestion" });
    }
  }
};
</script>

<style lang="scss" scoped>
.master-profile {
  position: relative;
  height: 100vh;
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

    .btn {
      position: absolute;
      background: #ffa702;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      height: 40px;
      line-height: 40px;
      width: calc(100% - 80px);
      margin-left: 40px;
      bottom: 60px;
    }
  }
}
</style>
