<template>
  <div class="socialPage">
    <div class="whiteBackground">
      <div class="title">{{ $t('Social.title') }}</div>
      <div class="backgroundImg"></div>
      <van-button class="joinBtn" @click="goNextPage" >{{ $t('Social.joinBtnTitle') }}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "socialPage",
  methods: {
    goNextPage(){
      this.$router.push({ name: "SocialHome" });
    }
  }
};
</script>

<style lang="scss" scoped>
.socialPage {
  height: 100vh;
  width: 100%;
  background-color: black;

  .whiteBackground {
    height: 100vh;
    width: 100%;
    background-color: white;
    border-radius: 20px;
  }

  .title {
    padding-top: 68px;
    margin: 0 16px 0 16px;
    width: 328px;
    height: 72px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }

  .backgroundImg {
    margin: 32px 30px 0 30px;
    background: url("../../assets/imgs/social/Social5Icon.png") no-repeat;
    background-size: contain;
    height: 360px;
    width: 300px;
  }

  .joinBtn {
    margin: 32px 16px 0 16px;
    width: 328px; //calc(100%-32px);
    font-size: 14px;
    background-color: #ffa702;
    color: #052d46;
  }

}
</style>
