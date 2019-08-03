<template>
    <div class="app-service-mgt-channels">
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
</template>

<script>
import { mapState } from "vuex";
import PaymentChannelList from "@/components/PaymentChannelList";
export default {
  name: "AppServiceManageChannels",
  props: {
    serviceType: String
  },
  components: {
    PaymentChannelList
  },
  data() {
    return {
      dialog: false,
      workingChannels:[],
    }
  },
  computed: {
    ...mapState({
      merchantId: state => state.merchantProfile.id,
      totalPaymentChannelList: "paymentChannelList",
      paymentChannelStatus: "paymentChannelStatus",
      merchantWorkingChannelStatus: "merchantWorkingChannelStatus",
    })
  },
  created() {
    this.$store.commit("fetchMerchantProfileFromLocal");
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-service-mgt-channels{
    padding: 24px 16px 16px 16px;
    .instruction{
      margin-top: 8px;
      color: #68737D;
      font-size: 14px;
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
