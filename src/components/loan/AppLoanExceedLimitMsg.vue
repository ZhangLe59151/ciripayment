<template>
  <div class="app-loan-exceed-limit-msg">
    <img src="@/assets/imgs/loan/TaokaeIconWithShadow.svg" id="taokae_icon"/>
    <div class="msg">
      {{$t("LoanExceedLimitError.title")}}
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLoanExceedLimitMsg"
}
</script>

<style lang="scss" scoped>
  .app-loan-exceed-limit-msg{
    height: 159px;
    width:100%;
    background-color: white;
    box-sizing: border-box;
    padding: 20px 16px 20px 16px;
    text-align: center;
    #taokae_icon{
      height: 60px;
      width:auto;
    }
    .msg{
      margin: 15px 0 0 0;
      font-size: 16px;
      font-weight: bold;
      color: #2F3941;
    }
  }
</style>
