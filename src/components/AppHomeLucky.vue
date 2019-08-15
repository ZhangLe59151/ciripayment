<template>
  <div class="app-home-lucky">
    <div class="title">{{$t("Home.luckyTitle")}}</div>
    <div class="subtitle">
      <div>{{$t("Home.luckySubtitleTop")}}</div>
      <div>{{$t("Home.luckySubtitleBtm")}}</div>
    </div>

    <div
      class="btn"
      @click="$router.push({name: 'FortuneTelling'})"
    >{{$t("Home.luckyBtn")}}</div>
  </div>
</template>

<style lang="scss" scoped>
.app-home-lucky {
  height: 160px;
  width: 100%;
  background-image: url(../assets/imgs/home_chest.png);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: right;
  margin: 8px 0;
  position: relative;
  > div {
    &.title {
      font-size: 14px;
      color: #ffd99f;
      position: absolute;
      top: 20px;
      right: 16px;
    }

    &.subtitle {
      font-weight: bold;
      font-size: 22px;
      color: #ffffff;
      position: absolute;
      top: 40px;
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
}
</style>
