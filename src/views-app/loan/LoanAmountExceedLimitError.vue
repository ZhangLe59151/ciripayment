<template>
  <div class="loan-amt-exd-limit-error">
    <div class="app-loan-amt-exd-limit-error-header">
      <van-icon name="cross" class="close" @click="$router.push({name:'Home'})"/>
      <div class="title">{{$t("AppLoanOverview.headerTitle")}}</div>
    </div>
    <loan-app-loan-exceed-limit-msg></loan-app-loan-exceed-limit-msg>
    <loan-app-loan-exceed-limit-instruction></loan-app-loan-exceed-limit-instruction>
  </div>
</template>

<script>
export default {
  name: "LoanAmountExceedLimitError"
}
</script>

<style lang="scss" scoped>
  .loan-amt-exd-limit-error{
    background-color: #E9EBED;
    min-height: 100vh;
    line-height: 20px;
    .app-loan-amt-exd-limit-error-header{
      background: #ffa702;
      height: 44px;
      width: 100%;
      position: relative;
      color:white;
      .title {
        position: absolute;
        top: 10px;
        font-size: 20px;
        line-height: 32px;
        display: inline-block;
        left: 16px;
      }
      .close {
        position: absolute;
        right: 20px;
        font-size: 20px;
        top: 15px;
      }
    }
  }

</style>
