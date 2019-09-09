<template>
  <div class="socialHome">
    <app-common-header :title="$t('Social.headTitle')" />
    <social-app-sign-in-profile />
  </div>
</template>

<script>
export default {
  name: "socialHome",
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
.socialHome {
  height: 100vh;
  width: 100%;
  background-color: white;

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
