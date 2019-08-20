<template>
  <router-link
    class="app-home-credit"
    tag="div"
    :to="{name: 'Credit',query: {origin: 'banner'}}"
  >
    <div class="des">Find Out Your Credit Limit</div>

    <div class="checkNow">Check Now</div>

  </router-link>
</template>

<script>
  export default {
    name: "AppHomeCredit"
  };
</script>

<style lang="scss" scoped>
  .app-home-credit {
    height: 100px;
    width: 100%;
    background-image: url(../assets/imgs/home_credit.png);
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: 8px;

    .des {
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
      position: relative;
      width:112px;
      top: 9px;
      left: 16px;

    }

    .checkNow {
      background: #FFFFFF;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
      border-radius: 4px;
      font-size: 14px;
      color: #363F47;
      letter-spacing: 0;
      text-align: center;
      line-height: 32px;
      width: 105px;
      height: 32px;
      position: relative;
      top: 17px;
      left: 16px;
    }
  }
</style>
