<template>
  <div class="daily-fortune">
    <app-fortune-header></app-fortune-header>
    <div class="top-half">
      <div class="master-icon">
      </div>
    </div>
    <div class="bottom-half">
      <div class="fortune-action">
        <van-button class="fortune-btn" type="primary" @click="start">
          Tell Me My Fortune
        </van-button>
        <div class="powered-tips">
          This service is powered by Master Tang
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFortuneHeader from "../../components/fortune-telling/AppFortuneHeader";
export default {
  name: "DailyFortunePrepare",
  components: { AppFortuneHeader },
  methods: {
    start() {
      this.$router.push({ name: "DailyFortuneQuestion" })
    }
  }
}
</script>

<style lang="scss" scoped>
  .daily-fortune {
    position: relative;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .top-half {
    background: #ff8600;
    position: absolute;
    top: 70px;
    bottom: 193px;
    width: 100%;
    .master-icon {
      position: absolute;
      background: no-repeat center url("../../assets/imgs/fortune-telling/fortune_telling_master.png");
      background-size: contain;
      bottom: 0;
      width: 100%;
      height: 360px;
    }
  }
  .bottom-half {
    background-color: #7b4508;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 193px;
    .fortune-action {
      position: absolute;
      height: 143px;
      left: 30px;
      right: 30px;
      top: 48px;
      bottom: 0;
      .fortune-btn {
        position: absolute;
        background-color: #FF8600;
        color: white;
        font-size: 20px;
        height: 60px;
        width: 100%;
      }
      .powered-tips {
        position: absolute;
        color: white;
        font-size: 12px;
        text-align: center;
        bottom: 20px;
        width: 100%;
        height: 10px;
      }
    }
  }
</style>
