<template>
  <div class="app-loan-header">
    <div class="title">
      Instant Loan
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLoanHeader"
}
</script>

<style lang="scss" scoped>
  @mixin item-position {
    position: absolute;
    top: 24px;
    font-size: 20px;
    line-height: 32px;
    color: #ffffff;
    display: inline-block;
  }

  .app-loan-header {
    background: #FF8600;
    height: 68px;
    width: 100%;
    position: relative;

    .title {
      @include item-position;
      left: 16px;
    }
  }
</style>
