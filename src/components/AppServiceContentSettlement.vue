<template>
<div class="app-service-cnt-settlement">
  <div class="block">
    <div class="title">Settlement</div>
    <div class="label">
      <span>Settlement option:</span>
      <span>Manual</span>
    </div>
    <van-button
      size="small"
      class="bottom-btn"
    >
      Manage Settlement
    </van-button>
  </div>
</div>
</template>

<script>
export default {
  name: "AppServiceContentSettlement"
}
</script>

<style lang="scss" scoped>
  .app-service-cnt-settlement{
    padding: 16px;
    border-bottom: 1px solid #e9ebed;

    .block {

      .title {
        font-size: 16px;
        color: #2f3941;
        letter-spacing: 0;
        font-weight: bold;
      }

      .label {
        padding: 16px 0;
        min-height: 16px;
        display: flex;

        > span {
          display: inline-block;
          width: 50%;

          > i {
            margin-left: 8px;
          }

          &:first-child {
            font-size: 14px;
            color: #87929d;
            letter-spacing: 0;
          }

          &:last-child {
            font-size: 14px;
            color: #2f3941;
            letter-spacing: 0;
            text-align: right;
          }
        }
      }
      .bottom-btn {
        font-size: 14px;
        width: 100%;
        margin: 0 10px 15px 0;
        height: 34px;
        color: #053C5E;
        background-color: #ffffff ;
        border-color: #053C5E;
      }
    }
  }
</style>
