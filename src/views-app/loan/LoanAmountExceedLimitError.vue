<template>
  <div class="loan-amt-exd-limit-error">
    <van-nav-bar
      title="Loan Application"
      @click-left="$router.back()"
      left-arrow
    />
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
  }

</style>
