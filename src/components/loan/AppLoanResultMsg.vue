<template>
  <div class="app-loan-result-msg">
    <div v-if="status === '0' ">
      <div style="font-size: 16px;">
        {{$t("AppLoanOverview.resultMsg.pending.heading")}}
      </div>
      <div style="margin-top: 10px ">
        {{$t("AppLoanOverview.resultMsg.pending.desc")}}
      </div>
    </div>
    <div v-else-if="status === '1' ">
      <div>
        {{$t("AppLoanOverview.resultMsg.approved.heading")}}
      </div>
      <div style="margin-top: 20px ">
        {{$t("AppLoanOverview.resultMsg.approved.desc")}}
      </div>
    </div>
    <div v-else>
      <div>
        {{$t("AppLoanOverview.resultMsg.rejected.heading")}}
      </div>
      <div style="margin-top: 20px ">
        {{$t("AppLoanOverview.resultMsg.rejected.desc")}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLoanResultMsg",
  props: {
    status: String
  }
}
</script>

<style lang="scss" scoped>
  .app-loan-result-msg{
    background: #E9EBED;
    border-radius: 4px;
    margin-top: 20px;
    font-size: 14px;
    color: #2F3941;
    letter-spacing: 0;
    text-align: center;
    line-height: 20px;
    padding: 16px;
  }
</style>
