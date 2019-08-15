<template>
  <div
    class="app-home-loan"
  >
    <div class="des">
      {{$t("Home.loan")}}
    </div>
    <div class="amount">
      100,000 ฿
    </div>

    <div
      class="getNow"
      @click="$router.push({name: 'Loan',query: {origin: 'banner'}})"
    >
      {{$t("Home.loanBtn")}}
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHomeLucky"
};
</script>

<style lang="scss" scoped>
.app-home-loan {
  height: 100px;
  width: 100%;
  text-align: center;
  background-image: url(../assets/imgs/home_loan.png);
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 8px;

  .des {
    font-size: 14px;
    color: #363f47;
    position: relative;
    top: 16px;
  }

  .amount {
    position: relative;
    top: 24px;
    font-size: 24px;
    color: #363f47;
    font-weight: bold;
  }

  .getNow {
    background: #ff8600;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    font-size: 12px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    line-height: 20px;
    width: 68px;
    height: 20px;
    position: relative;
    top: 26px;
    left: 50%;
    margin-left: -34px;
  }
}
</style>
