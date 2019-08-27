<template>
  <div class="app-loan-result-msg">
    <div v-if="status === '0' ">
      <div>
        Thank you for applying. We will update your application result as soon as possible.
      </div>
    </div>
    <div v-else-if="status === '1' ">
      <div>
        Congratulations on your successful application!
      </div>
      <div style="margin-top: 20px ">
        You may increase how much your business is worth in Credit Line before applying again.
      </div>
    </div>
    <div v-else>
      <div>
        We regret to inform you that your application was not successful.
      </div>
      <div style="margin-top: 20px ">
        You may increase how much your business is worth in Credit Line before applying again.
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
