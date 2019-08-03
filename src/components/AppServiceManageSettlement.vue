<template>
    <div class="app-service-mgt-settlement">
      <div class="instruction">
        Choose how you want to receive your revenue.
      </div>
      <div class="settlement">
        <el-radio-group
          v-model="settlementChoosing"
        >
          <el-radio :label="1">
            <div class="settlement-choice">
              Manual Settlement (Recommended)
            </div>

          </el-radio>
          <div class="settlement-desc">
            Manually transfer all revenue into your balance. Enjoy 10% lower servicing fee on all payment channels.
          </div>
          <el-radio :label="2">
            <div class="settlement-choice" style="margin-top: 20px;">
              Auto Settlement
            </div>

          </el-radio>
          <div class="settlement-desc">
            Automatically transfer all revenue into your balance at the end of each day.
          </div>
        </el-radio-group>
      </div>
      <div class="button-group">
        <van-row gutter="8">
          <van-col span="12"><van-button
            size="small"
            class="bottom-btn plain"
            @click="handleCancelSettlement"
          >
            Cancel
          </van-button>
          </van-col>
          <van-col span="12" offset="0">
            <van-button
              size="small"
              class="bottom-btn"
              @click="handleSaveSettlement"
            >
              Save Settings
            </van-button>
          </van-col>
        </van-row>

      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppServiceManagementSettlement",
  props: {
    serviceType: String
  },
  data() {
    return {
      settlementChoosing: 0
    }
  },
  computed: {
    ...mapState({
      merchantId: state => state.merchantProfile.id
    }),
    settlementType: {
      get() {
        console.log(this.$store.state.merchantProfile.merchantSettlementConfigVo);
        if (this.$store.state.merchantProfile.merchantSettlementConfigVo) {
          return this.$store.state.merchantProfile.merchantSettlementConfigVo.settlementType
        } else {
          // Not found settlement type
          return 0;
        }
      }
    }
  },
  watch: {
    settlementType(val) {
      this.settlementChoosing = val;
    }
  },
  created() {
    this.$store.commit("fetchMerchantProfileFromLocal");
    this.settlementChoosing = this.settlementType;
  },
  methods: {
    handleCancelSettlement() {
      this.$router.back();
    },
    handleSaveSettlement() {
      this.$api.updateMerchantSettlement({ id: this.merchantId, settlementType: this.settlementChoosing }).then(
        res => {
          if (res.data.code === 200) {
            this.$store.commit("updateSettlement", this.settlementChoosing);
          }
        }
      );
      this.$router.back();
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-service-mgt-settlement{
    padding: 24px 16px 16px 16px;
    .instruction{
      margin-top: 8px;
      color: #68737D;
      font-size: 14px;
    }
    .settlement {
      margin-top:32px;
      padding-bottom: 24px;
      border-bottom: 1px solid #e9ebed;
      .settlement-choice{
        display: inline-block;
        color: black;
        font-size: 16px;
        margin-left: 8px
      }
      .settlement-desc {
        color: #68737d;
        font-size: 14px;
        line-height: 22px;
        margin: 10px 0 10px 34px;
        font-weight: normal;
      }
    }
    .channels{
      .label {
        padding: 16px 0;
        min-height: 16px;
        display: flex;
        border-bottom: 1px solid #e9ebed;

        > span {
          display: inline-block;
          width: 50%;

          .channel-label{
            color: #2F3941;
            font-size: 14px;
            font-weight: bold;
            display: inline-block;
            position: relative;
            top: -6px;

          }

          .status-adjust-height{
            position: relative;
            top: 5px;
          }

          .green {
            color: #5ad4af;
          }

          .red {
            color: #d44832;
          }

          .gray {
            color: #A0B4C0;
          }

          .blue {
            color: #053c5e;
          }

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
      .channel-img {
        margin-right:20px;
        width: 48px;
        height: 24px;
        display: inline-block;
      }

    }
    .warning{
      margin-top: 32px;
      color: #68737D;
      font-size: 14px;
      .iconalert{
        color: #FCAA10;
      }
    }
    .button-group{
      margin-top:32px;
      .bottom-btn{
        width: 100%;
        height: auto;
      }
      .plain{
        color: #053C5E;
        background-color: #ffffff ;
        border-color: #053C5E;
      }
    }
    .view-pmt-detail{
      color: #037AFF;
      font-size: 12px;
      position: fixed;
      bottom: 20px;
      left: 50%;
      margin-left: -116px;
    }
  }
</style>

<style lang="scss">
  .settlement {
    .el-radio__input.is-checked .el-radio__inner {
      border-color: #04A777 !important;
      background: #04A777 !important;
    }
    .el-radio__inner{
      width: 16px;
      height: 16px;
    }
  }

</style>
