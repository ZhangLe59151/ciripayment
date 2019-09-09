<template>
  <div class="socialPage">
    <div class="whiteBackground">
      <div class="title">Connect your business to big opportunities.</div>
      <div class="backgroundImg"></div>
      <van-button class="joinBtn">Join The Community</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "socialPage",
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
.socialPage {
  height: 100vh;
  width: 100%;
  background-color: black;

  .whiteBackground {
    position: relative;
    height: 100vh;
    width: 100%;
    background-color: white;
    border-radius: 20px;
  }

  .title {
    position: absolute;
    margin: 92px 16px 0 16px;
    width: 328px;
    height: 72px;
    text-align: center;
    font-size: 24;
    font-weight: bold;
  }

  .backgroundImg {
    position: absolute;
    background: url("../../assets/imgs/social/Social5Icon.png") no-repeat;
    background-size: contain;
    height: 360px;
    width: 300px;
  }

  .joinBtn {
    position: absolute;
    bottom: 44px;
    left: 16px;
    right: 16px;
    width: 328px; //calc(100%-32px);
    font-size: 14px;
    background-color: #ffa702;
    color: #052d46;
  }

}
</style>
