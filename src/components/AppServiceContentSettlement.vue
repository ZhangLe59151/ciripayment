<template>
<div v-if="String(applicationStatus) === '1'" class="app-service-cnt-settlement">
  <div class="block">
    <div class="title">Settlement</div>
    <div class="label">
      <span>Settlement option:</span>
      <span>{{settlementType === 1 ? "Manual" : "Auto"}}</span>
    </div>
    <van-button
      size="small"
      class="bottom-btn"
      @click="navigateToMgtSettlement"
    >
      Manage Settlement
    </van-button>
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppServiceContentSettlement",
  computed: mapState({
    settlementType: state => {
      if (state.merchantProfile.merchantSettlementConfigVo) {
        return state.merchantProfile.merchantSettlementConfigVo.settlementType
      } else {
        // Not found settlement type
        return 0;
      }
    },
    applicationStatus: state => state.application.applicationStatus
  }),
  methods:
    {
      navigateToMgtSettlement() {
        this.$router.push({ name: "ManageSettlement" });
      }
    }
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
        color: #FF8600;
        background-color: #ffffff ;
        border-color: #FF8600;
      }
    }
  }
</style>
