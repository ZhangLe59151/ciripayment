<template>
    <div class="app-service-mgt-channels">
      <div class="channels">
        <div v-if="workingChannelsForm.length !== 0" class="working-channels-form">
          <van-row
            v-for="item in workingChannelsForm"
            :key="item.id"
            class="label"
          >
        <van-col span="12">
          <img :src="formatChannelLabel(item).img"
               class="channel-img">
          <div class="channel-label">
          {{formatChannelLabel(item).label}}
          </div>
        </van-col>
        <van-col span="10" offset="2">
          <van-row type="flex" justify="end">
            <van-col span="12"><div
              size="small"
              :class= "formatStatusButton(item) === 'ENABLED' ? 'btn enable-btn active-btn' : 'btn enable-btn'"
              @click="handleEnable(item)"
            >
              ENABLE
            </div>
            </van-col>
            <van-col span="12" offset="0">
              <div
                size="small"
                :class= "formatStatusButton(item) === 'ENABLED' ? 'btn disable-btn' : 'btn disable-btn active-btn'"
                @click="handleDisable(item)"
              >
                DISABLE
              </div>
            </van-col>
          </van-row>
        </van-col>
          </van-row>
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
      workingChannelsForm: [],
      updateChannels: []
    }
  },
  computed: {
    ...mapState({
      merchantId: state => state.merchantProfile.id,
      originalWorkingChannels: state =>
        (state.merchantProfile.merchantChannelConfigVoList)
          ? state.merchantProfile.merchantChannelConfigVoList.filter(channel => [1].includes(channel.applicationStatus))
          : [],
      totalPaymentChannelList: "paymentChannelList",
      merchantWorkingChannelStatus: "merchantWorkingChannelStatus"
    })
  },
  created() {
    this.$store.commit("fetchDataFromLocal");
    this.fetchData();
  },
  methods: {
    fetchData() {
      // Get list of workingChannelsForm channels
      this.workingChannelsForm = this.originalWorkingChannels
        .map(channel => ({
          applicationStatus: 1,
          id: channel.id,
          mdr: 12,
          merchantId: channel.merchantId,
          channelId: channel.channelId,
          channelStatus: channel.channelStatus }));
    },
    formatChannelLabel(item) {
      return this.totalPaymentChannelList.filter(channel => String(channel.id) === String(item.channelId))[0];
    },
    formatStatusButton(channel) {
      let status = this.merchantWorkingChannelStatus.filter(status => String(status.value) === String(channel.channelStatus))[0];
      return status.label;
    },
    handleEnable(item) {
      if (item.channelStatus === 2) {
        item.channelStatus = 1;
      }
    },
    handleDisable(item) {
      if (item.channelStatus === 1) {
        item.channelStatus = 2;
      }
    },
    handleCancel() {
      this.$router.back();
    },
    handleSave() {
      console.log(this.workingChannelsForm);
      this.$api.updateMerchantChannels(this.workingChannelsForm).then(
        res => {
          if (res.data.code === 200) {
            // update Form
            this.$store.commit("updateChannels", res.data.data.merchantChannelConfigVoList);
            this.$router.back();
          }
        }
      );
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
            color: #FF8600;
          }

          > i {
            margin-left: 8px;
          }

      }
      .channel-img {
        margin-right:20px;
        width: 48px;
        height: 24px;
        display: inline-block;
      }
      .enable-btn,.disable-btn {
        padding: 3px 5px 2px 8px ;
        text-align: center;
        border: 1px solid #FF8600;
        font-size: 12px;

      }
      .disable-btn{
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      .enable-btn{
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      .active-btn {
        background: #FF8600 !important;
        color:white !important;
      }
      btn{
        background: #ffffff;
        color: #FF8600;
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
        color: #FF8600;
        background-color: #ffffff ;
        border-color: #FF8600;
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
