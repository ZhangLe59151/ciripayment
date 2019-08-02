<template>
  <div class="app-service-management-content">
<!--    This is for settlement-->
    <div v-if="serviceType==='Settlement'" class="app-service-mgt-settlement-content">
      <div class="instruction">
        Choose how you want to receive your revenue.
      </div>
      <div class="settlement">
        <el-radio-group
          v-model="settlement"
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
      <div class="warning">
        <van-row>
          <van-col span="2"><i class="iconfont iconalert"></i>
          </van-col>
          <van-col span="22"><div class="warning-msg">Auto Settlement may incur a higher service fee.</div>
          </van-col>
        </van-row>
      </div>

      <div class="button-group">
        <van-row gutter="8">
          <van-col span="12"><van-button
            size="small"
            class="bottom-btn plain"
            @click="handleCancel"
          >
            Cancel
          </van-button>
          </van-col>
          <van-col span="12" offset="0">
            <van-button
              size="small"
              class="bottom-btn"
              @click="handleSave"
            >
              Save Settings
            </van-button>
          </van-col>
        </van-row>

      </div>
    </div>
<!--    End of Settlement-->
<!--    This is for Channels-->
    <div v-else class="app-service-mgt-channels-content">
      <div class="channels">
        <div v-if="workingChannels.length !== 0" class="working-channels">
          <div
            v-for="item in workingChannels"
            :key="item.id"
            class="label"
          >
        <span>
          <img :src="formatChannelLabel(item).img"
               class="channel-img">
          <div class="channel-label">
          {{formatChannelLabel(item).label}}
          </div>
        </span>
            <span>
            <div :class="formatStatus(item).color + ' status-adjust-height'">{{formatStatus(item).label}}
          </div>
          </span>
          </div>
        </div>
      </div>
      <div class="warning">
        <van-row>
          <van-col span="2"><i class="iconfont iconalert"></i>
          </van-col>
          <van-col span="22"><div class="warning-msg">Re-enabling a payment channel may take up to 48 hours.</div>
          </van-col>
        </van-row>
      <span>
      </span>
      </div>
      <div class="button-group">
        <van-row gutter="8">
          <van-col span="12"><van-button
            size="small"
            class="bottom-btn plain"
            @click="handleCancel"
          >
            Cancel
          </van-button>
          </van-col>
          <van-col span="12" offset="0">
            <van-button
              size="small"
              class="bottom-btn"
              @click="handleSave"
            >
              Save Settings
            </van-button>
          </van-col>
        </van-row>

      </div>
      <div class="view-pmt-detail" @click="openViewChannelsDetailDialog">
        Click here to view payment channel details.
      </div>
      <payment-channel-list :paymentChannelList="totalPaymentChannelList" v-bind:dialog.sync="dialog" />
    </div>
<!--    End of Channels-->
  </div>

</template>

<script>
import { mapState } from "vuex";
import PaymentChannelList from "@/components/PaymentChannelList";
export default {
  name: "AppServiceManagementContent",
  props: {
    serviceType: String
  },
  components: {
    PaymentChannelList
  },
  data() {
    return {
      dialog: false,
      settlement: 1
    }
  },
  computed: {
    ...mapState({
      totalPaymentChannelList: "paymentChannelList",
      paymentChannelStatus: "paymentChannelStatus",
      workingChannels: "workingChannels"
    })
  },
  methods: {
    formatChannelLabel(item) {
      return this.totalPaymentChannelList.filter(channel => String(channel.id) === String(item.channelId))[0];
    },
    formatStatus(channel) {
      return this.paymentChannelStatus.filter(status => String(status.value) === String(channel.status))[0];
    },
    handleCancel() {
      this.$router.back();
    },
    handleSave() {
      this.$router.back();
    },
    openViewChannelsDetailDialog() {
      this.dialog = true;
    },
    closeViewChannelsDetailDialog() {
      this.dialog = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-service-management-content{
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
